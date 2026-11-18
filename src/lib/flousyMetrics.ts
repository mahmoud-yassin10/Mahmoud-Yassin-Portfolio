import type { AnalyticsEvent, DailyTotals, FlowStepTotals } from "./flousyAnalytics";

// Days are counted in Cairo time, the audience's day, not UTC.
const CAIRO = "Africa/Cairo";

export const cairoDay = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: CAIRO }).format(date);

const shiftDay = (day: string, delta: number) => {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
};

const isUser = (e: AnalyticsEvent) => Boolean(e.uid) && e.uid !== "anonymous";

const sourceOf = (e: AnalyticsEvent) => String(e.metadata?.source ?? "");

/** Insight sources that come from the AI (chat answer, Can I Spend coach). */
const AI_SOURCES = new Set(["can_i_spend", "ai_chat"]);

/**
 * Funnel steps. The app sends different names than the old funnel expected
 * (onboarding_* for money_setup_*, transaction_created for the first
 * transaction, plan_generation_completed for the first plan), so each step
 * lists every name that counts. Steps after the visits count people, not events.
 */
const STEPS: {
  name: string;
  label: string;
  names: string[];
  people: boolean;
}[] = [
  { name: "store_visit", label: "store visit", names: ["store_visit"], people: false },
  { name: "install", label: "install", names: ["install"], people: false },
  { name: "sign_up_completed", label: "sign up completed", names: ["sign_up_completed"], people: true },
  { name: "onboarding_started", label: "money setup started", names: ["onboarding_started", "money_setup_started"], people: true },
  { name: "onboarding_completed", label: "money setup completed", names: ["onboarding_completed", "money_setup_completed"], people: true },
  { name: "first_transaction", label: "first transaction", names: ["transaction_created", "first_transaction_added"], people: true },
  { name: "first_plan", label: "first plan", names: ["plan_generation_completed", "first_plan_generated"], people: true },
  { name: "sms_permission_viewed", label: "sms permission viewed", names: ["sms_permission_viewed"], people: true },
  { name: "sms_permission_accepted", label: "sms permission accepted", names: ["sms_permission_accepted"], people: true },
  { name: "insight_viewed", label: "first insight", names: ["insight_viewed"], people: true },
];

export function buildFunnel(events: AnalyticsEvent[]) {
  const counts = STEPS.map((step) => {
    const matching = events.filter((e) => step.names.includes(e.name));
    return step.people
      ? new Set(matching.filter(isUser).map((e) => e.uid)).size
      : matching.length;
  });
  const first = Math.max(1, counts[0]);
  return STEPS.map((step, i) => ({
    name: step.name,
    label: step.label,
    count: counts[i],
    rate: i === 0 ? 100 : Math.round((counts[i] / first) * 100),
  }));
}

/**
 * The North Star: of the people active in the last 7 days, how many viewed an
 * insight. Also reported for AI-sourced insights only.
 */
export function northStar(events: AnalyticsEvent[], now = new Date()) {
  const since = now.valueOf() - 7 * 86400000;
  const recent = events.filter((e) => isUser(e) && e.createdAt.valueOf() >= since);
  const active = new Set(recent.map((e) => e.uid));
  const viewed = recent.filter((e) => e.name === "insight_viewed");
  const viewers = new Set(viewed.map((e) => e.uid));
  const aiViewers = new Set(viewed.filter((e) => AI_SOURCES.has(sourceOf(e))).map((e) => e.uid));
  const rate = (n: number) => (active.size ? n / active.size : 0);
  return {
    active: active.size,
    viewers: viewers.size,
    aiViewers: aiViewers.size,
    rate: rate(viewers.size),
    aiRate: rate(aiViewers.size),
  };
}

/**
 * Day-1 and day-7 return, worked out from app_open events instead of events
 * the app never sends. A person's day 0 is the day their first event in the
 * window was seen; people first seen on the window's opening day are left out
 * because they may have joined long before it. A day only counts once it has
 * fully passed.
 */
export function retention(events: AnalyticsEvent[], windowDays: number, now = new Date()) {
  const today = cairoDay(now);
  const windowStart = cairoDay(new Date(now.valueOf() - windowDays * 86400000));
  const firstSeen = new Map<string, string>();
  const opens = new Map<string, Set<string>>();
  for (const e of events.filter(isUser)) {
    const day = cairoDay(e.createdAt);
    const uid = e.uid as string;
    const prev = firstSeen.get(uid);
    if (!prev || day < prev) firstSeen.set(uid, day);
    if (e.name === "app_open") {
      if (!opens.has(uid)) opens.set(uid, new Set());
      opens.get(uid)!.add(day);
    }
  }
  const measure = (offset: number) => {
    let eligible = 0;
    let returned = 0;
    for (const [uid, start] of firstSeen) {
      if (start <= windowStart) continue;
      const target = shiftDay(start, offset);
      if (target >= today) continue;
      eligible++;
      if (opens.get(uid)?.has(target)) returned++;
    }
    return { eligible, returned, rate: eligible ? returned / eligible : null };
  };
  return { d1: measure(1), d7: measure(7) };
}


// ---- Names people can read ------------------------------------------------------

const LABELS: Record<string, string> = {
  app_open: "App opened",
  login_completed: "Signed in",
  login_failed: "Sign-in failed",
  onboarding_started: "Money setup started",
  onboarding_completed: "Money setup completed",
  money_setup_started: "Money setup started",
  money_setup_completed: "Money setup completed",
  transaction_created: "Transaction added",
  first_transaction_added: "First transaction",
  transaction_detected_from_sms: "Transaction found in an SMS",
  transaction_confirmed: "SMS transaction confirmed",
  transaction_rejected: "SMS transaction rejected",
  transaction_edited: "Transaction edited",
  transaction_recategorized: "Transaction recategorized",
  account_created: "Account added",
  account_rule_created: "SMS account rule created",
  sms_account_resolved: "SMS matched to an account",
  sms_account_ambiguous: "SMS account unclear",
  sms_capture_failed: "SMS capture failed",
  pending_capture_reviewed: "Pending SMS reviewed",
  plan_generation_started: "Plan generation started",
  plan_generation_completed: "Plan generated",
  plan_generation_failed: "Plan generation failed",
  first_plan_generated: "First plan",
  plan_regenerated: "Plan regenerated",
  plan_reevaluated: "Plan re-checked",
  goal_created: "Goal created",
  goal_progress_updated: "Goal progress updated",
  feedback_submitted: "Feedback sent",
  subscription_viewed: "Subscription viewed",
  paywall_viewed: "Paywall viewed",
  purchase_started: "Purchase started",
  purchase_completed: "Purchase completed",
  purchase_succeeded: "Purchase completed",
  purchase_failed: "Purchase failed",
  restore_tapped: "Restore tapped",
  insight_viewed: "Insight viewed",
  insight_shared: "Insight shared",
  can_i_spend_used: "Can I Spend used",
  sign_up_started: "Sign-up started",
  sign_up_completed: "Sign-up completed",
  sms_permission_viewed: "SMS permission shown",
  sms_permission_accepted: "SMS permission accepted",
  portfolio_visit: "Website visit",
  store_visit: "Store visit",
  install: "Install",
  referral_shared: "Invite shared",
  referral_activated: "Invite activated",
  day_1_return: "Back after 1 day",
  day_7_return: "Back after 7 days",
  screen_viewed: "Screen viewed",
  flow_step: "Flow step",
  ui_error: "Screen error",
  feature_used: "Feature used",
  // screens
  home: "Home",
  activity: "Activity",
  planner: "Planner",
  goals: "Goals",
  analytics: "Analytics",
  ai_chat: "Flousy AI chat",
  can_i_spend: "Can I Spend",
  previous_reports: "Previous reports",
  settings: "Settings",
  paywall: "Paywall",
  pro_hub: "Pro page",
  recap: "Recap",
  // flows and steps
  money_setup: "Money setup",
  planner_setup: "Planner setup",
  welcome: "Welcome tour",
  add_transaction: "Add a transaction",
  edit_transaction: "Edit a transaction",
  accounts: "Accounts",
  income: "Income",
  commitments: "Bills and commitments",
  household: "Household",
  debts: "Debts",
  safety_funds: "Safety and funds",
  month_intent: "This month",
  priorities: "Priorities",
  path: "The path",
  month_ahead: "The month ahead",
  spend: "Spending",
  form: "The form",
  done: "Finished",
};

const titleCase = (text: string) => text.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

/** A readable name for an event, screen, flow or step code. */
export const readable = (code: string) => LABELS[code] ?? titleCase(code);

// ---- Totals over a window of days -------------------------------------------

const sumNames = (day: DailyTotals, names: string[]) => names.reduce((n, name) => n + (day.events[name] ?? 0), 0);

export function splitPeriods(days: DailyTotals[], windowDays: number, now = new Date()) {
  const today = cairoDay(now);
  const start = cairoDay(new Date(now.valueOf() - (windowDays - 1) * 86400000));
  const prevStart = cairoDay(new Date(now.valueOf() - (2 * windowDays - 1) * 86400000));
  return {
    current: days.filter((d) => d.day >= start && d.day <= today),
    previous: days.filter((d) => d.day >= prevStart && d.day < start),
  };
}

export const total = (days: DailyTotals[], names: string[]) => days.reduce((n, d) => n + sumNames(d, names), 0);

/** Change against the period before, or null when there is nothing to compare. */
export function change(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return (current - previous) / previous;
}

export function changeText(current: number, previous: number, label: string): string {
  const c = change(current, previous);
  if (c === null) return label;
  const sign = c >= 0 ? "+" : "";
  return `${sign}${Math.round(c * 100)}% vs the period before`;
}

export type ScreenRow = { screen: string; label: string; views: number; avgSec: number | null };

export function screenRows(days: DailyTotals[]): ScreenRow[] {
  const merged = new Map<string, { views: number; totalMs: number; timed: number }>();
  for (const d of days) {
    for (const [screen, v] of Object.entries(d.screens)) {
      const m = merged.get(screen) ?? { views: 0, totalMs: 0, timed: 0 };
      m.views += v.views;
      m.totalMs += v.totalMs;
      m.timed += v.timed;
      merged.set(screen, m);
    }
  }
  return [...merged.entries()]
    .map(([screen, m]) => ({ screen, label: readable(screen), views: m.views, avgSec: m.timed ? m.totalMs / m.timed / 1000 : null }))
    .sort((a, b) => b.views - a.views);
}

export type FlowStepRow = {
  step: string;
  label: string;
  index: number;
  views: number;
  completed: number;
  abandoned: number;
  skipped: number;
  errors: number;
  avgSec: number | null;
  /** Share of the people who reached this step and left the flow here. */
  dropRate: number | null;
};

export type FlowRow = { flow: string; label: string; started: number; finished: number; steps: FlowStepRow[]; worst: FlowStepRow | null };

export function flowRows(days: DailyTotals[]): FlowRow[] {
  const merged = new Map<string, Map<string, FlowStepTotals>>();
  for (const d of days) {
    for (const [flow, steps] of Object.entries(d.flows)) {
      const f = merged.get(flow) ?? new Map<string, FlowStepTotals>();
      for (const [step, v] of Object.entries(steps)) {
        const m = f.get(step) ?? { viewed: 0, completed: 0, abandoned: 0, skipped: 0, error: 0, totalMs: 0, timed: 0, indexSum: 0, indexN: 0 };
        for (const key of Object.keys(m) as (keyof FlowStepTotals)[]) m[key] += v[key];
        f.set(step, m);
      }
      merged.set(flow, f);
    }
  }
  return [...merged.entries()]
    .map(([flow, steps]) => {
      const rows: FlowStepRow[] = [...steps.entries()]
        .filter(([step]) => step !== "done")
        .map(([step, m]) => {
          const views = m.viewed + m.abandoned;
          return {
            step,
            label: readable(step),
            index: m.indexN ? m.indexSum / m.indexN : 0,
            views,
            completed: m.completed,
            abandoned: m.abandoned,
            skipped: m.skipped,
            errors: m.error,
            avgSec: m.timed ? m.totalMs / m.timed / 1000 : null,
            dropRate: views >= 5 ? m.abandoned / views : null,
          };
        })
        .sort((a, b) => a.index - b.index);
      const finished = steps.get("done")?.completed ?? 0;
      const started = rows.length ? Math.max(...rows.map((r) => r.views)) : 0;
      const worst = rows.filter((r) => r.dropRate !== null && r.abandoned > 0).sort((a, b) => (b.dropRate ?? 0) - (a.dropRate ?? 0))[0] ?? null;
      return { flow, label: readable(flow), started, finished, steps: rows, worst };
    })
    .sort((a, b) => b.started - a.started);
}

export function errorRows(days: DailyTotals[]): { screen: string; label: string; code: string; count: number }[] {
  const merged = new Map<string, number>();
  for (const d of days) {
    for (const [screen, codes] of Object.entries(d.errors)) {
      for (const [code, n] of Object.entries(codes)) merged.set(`${screen}|${code}`, (merged.get(`${screen}|${code}`) ?? 0) + n);
    }
  }
  return [...merged.entries()]
    .map(([key, count]) => {
      const [screen, code] = key.split("|");
      return { screen, label: readable(screen), code, count };
    })
    .sort((a, b) => b.count - a.count);
}

export function featureRows(days: DailyTotals[]): { feature: string; label: string; count: number }[] {
  const merged = new Map<string, number>();
  for (const d of days) for (const [f, n] of Object.entries(d.features)) merged.set(f, (merged.get(f) ?? 0) + n);
  return [...merged.entries()].map(([feature, count]) => ({ feature, label: readable(feature), count })).sort((a, b) => b.count - a.count);
}
