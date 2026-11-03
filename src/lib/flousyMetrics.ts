import type { AnalyticsEvent } from "./flousyAnalytics";

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
