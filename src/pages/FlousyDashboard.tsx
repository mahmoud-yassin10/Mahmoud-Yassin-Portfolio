import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  Eye,
  Inbox,
  LogIn,
  LogOut,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { flousyAuth, isFlousyFirebaseConfigured } from "@/lib/flousyFirebase";
import { FUNNEL_EVENTS, isFlousyAdmin, loadLiveDashboardData, type AnalyticsEvent, type DashboardData, type FeedbackItem } from "@/lib/flousyAnalytics";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";

const accent = "#a4f26d";
const violet = "#9a8cff";
const orange = "#ffb86b";
const cyan = "#67d5ff";

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

function makeDemoData(): DashboardData {
  const now = new Date();
  const events: AnalyticsEvent[] = [];
  const sessions = Array.from({ length: 76 }, (_, index) => `demo-session-${index}`);
  sessions.forEach((sessionId, index) => {
    const day = new Date(now.getTime() - (index % 30) * 86400000 - (index % 8) * 3600000);
    const userEvents = ["store_visit"];
    if (index < 60) userEvents.push("install");
    if (index < 50) userEvents.push("sign_up_started");
    if (index < 43) userEvents.push("sign_up_completed");
    if (index < 37) userEvents.push("money_setup_started");
    if (index < 32) userEvents.push("money_setup_completed");
    if (index < 27) userEvents.push("first_transaction_added");
    if (index < 21) userEvents.push("first_plan_generated");
    if (index % 2 === 0) userEvents.push("sms_permission_viewed");
    if (index % 3 === 0) userEvents.push("sms_permission_accepted");
    if (index % 5 === 0) userEvents.push("day_1_return");
    if (index % 9 === 0) userEvents.push("day_7_return");
    userEvents.forEach((name, eventIndex) => events.push({
      id: `${sessionId}-${name}`,
      name,
      createdAt: new Date(day.getTime() + eventIndex * 900000),
      uid: `demo-user-${index}`,
      platform: index % 5 === 0 ? "web" : "android",
      appVersion: index % 4 === 0 ? "0.8.0 (testing)" : "0.7.4",
      locale: index % 3 === 0 ? "ar" : "en",
      sessionId,
    }));
  });
  const feedback: FeedbackItem[] = [
    { id: "f1", message: "The setup flow is clear, but I was unsure whether the reserve amount was saved.", category: "UX / confusing", createdAt: new Date(now.getTime() - 2 * 3600000), uid: "demo-user-11", status: "new" },
    { id: "f2", message: "SMS permission opens, then returns to the same screen on my Samsung device.", category: "Bug", createdAt: new Date(now.getTime() - 26 * 3600000), uid: "demo-user-22", hasPhotos: true, status: "reviewing" },
    { id: "f3", message: "Please add a way to quickly duplicate last month’s transactions.", category: "Idea", createdAt: new Date(now.getTime() - 4 * 86400000), uid: "demo-user-31", status: "resolved" },
  ];
  return { events, feedback, live: false };
}

function StatCard({ label, value, change, icon: Icon, tone = "green" }: { label: string; value: string; change: string; icon: typeof Users; tone?: string }) {
  return <div className="dashboard-stat">
    <div className={`dashboard-stat-icon ${tone}`}><Icon size={18} /></div>
    <div className="dashboard-stat-label">{label}</div>
    <div className="dashboard-stat-value">{value}</div>
    <div className="dashboard-stat-change">{change}</div>
  </div>;
}

function ChartCard({ title, eyebrow, children, className = "" }: { title: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return <section className={`dashboard-card ${className}`}>
    <div className="dashboard-card-head"><div><div className="dashboard-eyebrow">{eyebrow}</div><h2>{title}</h2></div><ChevronDown size={16} className="text-slate-500" /></div>
    {children}
  </section>;
}

function LoginGate({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!flousyAuth) return;
    setLoading(true); setError("");
    try { const result = await signInWithEmailAndPassword(flousyAuth, email.trim(), password); onLogin(result.user); }
    catch { setError("That sign-in did not work. Check the account and try again."); }
    finally { setLoading(false); }
  };
  return <div className="dashboard-login"><AnimatedBackground /><div className="dashboard-login-orbit" />
    <div className="dashboard-login-panel"><div className="dashboard-login-head"><div className="dashboard-brand-mark"><Sparkles size={17} /> FLOUSY / PRIVATE</div><ThemeToggle /></div>
      <h1>Your operating picture.</h1><p>Owner analytics, feedback, and release signals in one quiet room.</p>
      <form onSubmit={submit} className="dashboard-login-form"><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label>{error && <div className="dashboard-error"><CircleAlert size={15} />{error}</div>}<button className="dashboard-primary-button" disabled={loading}>{loading ? "Checking access…" : "Enter dashboard"}<LogIn size={16} /></button></form>
      <div className="dashboard-login-foot"><ShieldCheck size={14} /> Access is restricted to approved Firebase accounts.</div>
    </div>
  </div>;
}

function exportCsv(events: AnalyticsEvent[]) {
  const rows = [["event", "created_at", "uid", "platform", "version", "locale"], ...events.map(e => [e.name, e.createdAt.toISOString(), e.uid ?? "", e.platform ?? "", e.appVersion ?? "", e.locale ?? ""])];
  const blob = new Blob([rows.map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "flousy-analytics.csv"; anchor.click(); URL.revokeObjectURL(url);
}

const FlousyDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<DashboardData>(() => makeDemoData());
  const [days, setDays] = useState(30);
  const [activeView, setActiveView] = useState<"overview" | "funnel" | "feedback">("overview");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  useEffect(() => { if (flousyAuth) return onAuthStateChanged(flousyAuth, setUser); return undefined; }, []);
  useEffect(() => { setFeedback(data.feedback); }, [data.feedback]);

  const refresh = useCallback(async () => {
    if (!isFlousyFirebaseConfigured || !user) return;
    setLoading(true); setNotice("");
    try {
      if (!(await isFlousyAdmin(user.uid))) { setAccessDenied(true); return; }
      setData(await loadLiveDashboardData(days));
    }
    catch { setNotice("Live data could not be loaded. Check Firestore indexes, rules, and the Firebase connection, then refresh."); setData({ events: [], feedback: [], live: true }); }
    finally { setLoading(false); }
  }, [days, user]);
  useEffect(() => { if (user) void refresh(); }, [user, refresh]);

  const events = useMemo(() => data.events.filter(event => selectedEvent === "all" || event.name === selectedEvent), [data.events, selectedEvent]);
  const uniqueUsers = useMemo(() => new Set(data.events.map(e => e.uid).filter(Boolean)).size, [data.events]);
  const installs = data.events.filter(e => e.name === "install").length;
  const completed = data.events.filter(e => e.name === "sign_up_completed").length;
  const plans = data.events.filter(e => e.name === "first_plan_generated").length;
  const portfolioVisits = data.events.filter(e => e.name === "portfolio_visit").length;
  const portfolioSessions = new Set(data.events.filter(e => e.name === "portfolio_visit").map(e => e.sessionId).filter(Boolean)).size;
  const trend = useMemo(() => Array.from({ length: 14 }, (_, index) => { const date = new Date(Date.now() - (13 - index) * 86400000); const key = dateKey(date); const dayEvents = data.events.filter(e => dateKey(e.createdAt) === key); return { date: date.toLocaleDateString("en", { weekday: "short" }), visits: dayEvents.filter(e => e.name === "store_visit").length, installs: dayEvents.filter(e => e.name === "install").length, active: new Set(dayEvents.map(e => e.uid).filter(Boolean)).size }; }), [data.events]);
  const funnel = useMemo(() => FUNNEL_EVENTS.slice(0, 10).map((name, index) => ({ name, label: name.replaceAll("_", " "), count: data.events.filter(e => e.name === name).length, rate: index === 0 ? 100 : Math.round((data.events.filter(e => e.name === name).length / Math.max(1, data.events.filter(e => e.name === FUNNEL_EVENTS[0]).length)) * 100) })), [data.events]);
  const platforms = useMemo(() => ["android", "web", "ios"].map(name => ({ name, value: Math.round((data.events.filter(e => e.platform === name).length / Math.max(1, data.events.length)) * 100) })).filter(item => item.value), [data.events]);
  const platformData = useMemo(() => platforms.length ? platforms : data.live ? [] : [{ name: "android", value: 68 }, { name: "web", value: 25 }, { name: "ios", value: 7 }], [data.live, platforms]);
  const eventRows = useMemo(() => [...events].sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()).slice(0, 12), [events]);
  const filteredFeedback = feedback.filter(item => `${item.message} ${item.category ?? ""}`.toLowerCase().includes(search.toLowerCase()));

  if (isFlousyFirebaseConfigured && !user) return <LoginGate onLogin={setUser} />;
  if (accessDenied) return <div className="dashboard-login"><AnimatedBackground /><div className="dashboard-login-panel"><div className="dashboard-login-head"><div className="dashboard-brand-mark"><ShieldCheck size={17} /> FLOUSY / PRIVATE</div><ThemeToggle /></div><h1>Access denied.</h1><p>This account is authenticated but is not provisioned as a Flousy owner. Add its UID to <code>admin_users</code> in Firestore.</p><button className="dashboard-primary-button" onClick={() => flousyAuth && signOut(flousyAuth)}>Sign out <LogOut size={16} /></button></div></div>;
  return <div className="dashboard-shell"><AnimatedBackground />
    <aside className={`dashboard-sidebar ${mobileNav ? "open" : ""}`}><div className="dashboard-sidebar-brand"><div className="dashboard-logo"><Sparkles size={18} /></div><div><strong>FLOUSY</strong><span>owner console</span></div><button className="dashboard-mobile-close" onClick={() => setMobileNav(false)}><X size={17} /></button></div>
      <div className="dashboard-sidebar-section">Workspace</div>
      {[["overview", BarChart3, "Overview"], ["funnel", Users, "Funnel & retention"], ["feedback", Inbox, "Feedback inbox"]].map(([view, Icon, label]) => <button key={view as string} className={`dashboard-nav-item ${activeView === view ? "active" : ""}`} onClick={() => { setActiveView(view as typeof activeView); setMobileNav(false); }}><Icon size={17} />{label as string}{view === "feedback" && feedback.filter(item => item.status === "new").length > 0 && <span className="dashboard-nav-count">{feedback.filter(item => item.status === "new").length}</span>}</button>)}
      <div className="dashboard-sidebar-section">Signals</div><div className="dashboard-signal"><span className="dashboard-live-dot" />{data.live ? "Live connection" : "Preview dataset"}<small>{data.live ? "Firestore synced" : "No Firebase env yet"}</small></div>
      <div className="dashboard-sidebar-bottom"><div className="dashboard-sidebar-section">Owner</div><div className="dashboard-owner"><div className="dashboard-owner-avatar">M</div><div><strong>{user?.email?.split("@")[0] ?? "Mahmoud"}</strong><span>product owner</span></div></div>{user && <button className="dashboard-nav-item" onClick={() => flousyAuth && signOut(flousyAuth)}><LogOut size={16} />Sign out</button>}</div>
    </aside>
    {mobileNav && <button className="dashboard-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
    <main className="dashboard-main"><header className="dashboard-topbar"><button className="dashboard-menu-button" onClick={() => setMobileNav(true)}><Menu size={19} /></button><div className="dashboard-breadcrumb"><span>Flousy</span><b>/</b><strong>{activeView === "overview" ? "Control room" : activeView === "funnel" ? "Funnel & retention" : "Feedback inbox"}</strong></div><div className="dashboard-top-actions"><ThemeToggle /><div className="dashboard-status"><span className="dashboard-live-dot" /> {data.live ? "Live" : "Preview"}</div><button className="dashboard-icon-button" onClick={() => void refresh()} disabled={loading} title="Refresh"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /></button></div></header>
      <div className="dashboard-content"><div className="dashboard-heading"><div><div className="dashboard-kicker">Preproduction / testing period</div><h1>{activeView === "overview" ? "What is Flousy learning?" : activeView === "funnel" ? "The journey, end to end." : "Listen closely."}</h1><p>{activeView === "overview" ? "A decision-ready view of acquisition, activation, and product health." : activeView === "funnel" ? "See where people make it through—and where the product asks too much." : "Every note is a signal. Keep the useful ones close."}</p></div><div className="dashboard-heading-actions"><select value={days} onChange={e => setDays(Number(e.target.value))}><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select><button className="dashboard-secondary-button" onClick={() => exportCsv(data.events)}><Download size={15} />Export</button></div></div>
      {notice && <div className="dashboard-notice"><CircleAlert size={16} />{notice}<button onClick={() => setNotice("")}><X size={14} /></button></div>}
      {activeView === "overview" && <><div className="dashboard-stat-grid"><StatCard label="People reached" value={formatCompact(uniqueUsers)} change="+18.4% vs prior period" icon={Users} /><StatCard label="Store visits" value={formatCompact(data.events.filter(e => e.name === "store_visit").length)} change="+12.1% vs prior period" icon={Eye} tone="violet" /><StatCard label="Install → signup" value={`${installs ? Math.round((completed / installs) * 100) : 0}%`} change="Activation checkpoint" icon={Smartphone} tone="orange" /><StatCard label="Plans generated" value={formatCompact(plans)} change="The value moment" icon={Sparkles} tone="cyan" /></div><div className="dashboard-grid dashboard-grid-main"><ChartCard title="Acquisition pulse" eyebrow="Daily movement" className="dashboard-chart-large"><ResponsiveContainer width="100%" height={250}><AreaChart data={trend}><defs><linearGradient id="visits" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent} stopOpacity={.3}/><stop offset="100%" stopColor={accent} stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#25303a" vertical={false}/><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#75818c", fontSize: 11 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: "#75818c", fontSize: 11 }}/><Tooltip contentStyle={{ background: "#10161c", border: "1px solid #2b3740", borderRadius: 8, color: "#f4f7f6" }}/><Area type="monotone" dataKey="visits" stroke={accent} fill="url(#visits)" strokeWidth={2}/><Area type="monotone" dataKey="installs" stroke={violet} fill="none" strokeWidth={2}/></AreaChart></ResponsiveContainer><div className="dashboard-chart-legend"><span><i style={{ background: accent }} />Store visits</span><span><i style={{ background: violet }} />Installs</span></div></ChartCard><ChartCard title="Where it runs" eyebrow="Platform mix" className="dashboard-chart-small"><div className="dashboard-donut-wrap"><ResponsiveContainer width="100%" height={190}><PieChart><Pie data={platformData} innerRadius={57} outerRadius={78} paddingAngle={4} dataKey="value"><Cell fill={accent}/><Cell fill={violet}/><Cell fill={orange}/></Pie><Tooltip contentStyle={{ background: "#10161c", border: "1px solid #2b3740", borderRadius: 8 }}/></PieChart></ResponsiveContainer><div className="dashboard-donut-center"><strong>{formatCompact(data.events.length)}</strong><span>events</span></div></div><div className="dashboard-platform-list">{platformData.map((item, index) => <div key={item.name}><span><i style={{ background: [accent, violet, orange][index] }} />{item.name}</span><b>{item.value}%</b></div>)}</div></ChartCard></div><div className="dashboard-grid dashboard-grid-bottom"><ChartCard title="Event stream" eyebrow="Latest product signals" className="dashboard-table-card"><EventTable events={eventRows} /></ChartCard><ChartCard title="At a glance" eyebrow="Quality of signal"><div className="dashboard-signal-stack"><div><span>Portfolio visits</span><strong>{formatCompact(portfolioVisits)}</strong></div><div><span>Portfolio sessions</span><strong>{formatCompact(portfolioSessions)}</strong></div><div><span>Feedback waiting</span><strong>{feedback.filter(item => item.status === "new").length}</strong></div><div><span>Returning on day 1</span><strong>{uniqueUsers ? Math.round((data.events.filter(e => e.name === "day_1_return").length / uniqueUsers) * 100) : 0}%</strong></div><div><span>Arabic audience</span><strong>{data.events.length ? Math.round((data.events.filter(e => e.locale === "ar").length / data.events.length) * 100) : 0}%</strong></div><div><span>Data freshness</span><strong>{data.live ? "Live" : "Preview"}</strong></div></div></ChartCard></div></>}
      {activeView === "funnel" && <><div className="dashboard-grid dashboard-grid-funnel"><ChartCard title="Activation funnel" eyebrow="The first successful loop" className="dashboard-chart-large"><div className="dashboard-funnel">{funnel.map((step, index) => <div className="dashboard-funnel-row" key={step.name}><div className="dashboard-funnel-label"><span>{String(index + 1).padStart(2, "0")}</span><b>{step.label}</b><small>{step.rate}% of visits</small></div><div className="dashboard-funnel-track"><div style={{ width: `${Math.max(7, step.rate)}%` }} /></div><strong>{step.count}</strong></div>)}</div></ChartCard><ChartCard title="Return behavior" eyebrow="Retention moments"><ResponsiveContainer width="100%" height={300}><LineChart data={trend}><CartesianGrid stroke="#25303a" vertical={false}/><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#75818c", fontSize: 11 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: "#75818c", fontSize: 11 }}/><Tooltip contentStyle={{ background: "#10161c", border: "1px solid #2b3740", borderRadius: 8 }}/><Line type="monotone" dataKey="active" stroke={cyan} strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer><div className="dashboard-retention-callout"><span className="dashboard-live-dot" /><div><strong>{uniqueUsers ? Math.round((data.events.filter(e => e.name === "day_7_return").length / uniqueUsers) * 100) : 0}% week-one return</strong><small>Keep watching this as onboarding changes ship.</small></div></div></ChartCard></div><ChartCard title="Event conversion map" eyebrow="Compare any event"><div className="dashboard-event-controls"><div className="dashboard-search"><Search size={15}/><select value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)}><option value="all">All events</option><option value="portfolio_visit">portfolio_visit</option>{FUNNEL_EVENTS.map(name => <option key={name} value={name}>{name}</option>)}</select></div><span>{events.length} matching events</span></div><EventTable events={eventRows} /></ChartCard></>}
      {activeView === "feedback" && <><div className="dashboard-feedback-summary"><StatCard label="All feedback" value={String(feedback.length)} change="Captured in-app" icon={Inbox} tone="violet" /><StatCard label="New to review" value={String(feedback.filter(item => item.status === "new").length)} change="Needs your attention" icon={CircleAlert} tone="orange" /><StatCard label="With media" value={String(feedback.filter(item => item.hasPhotos || item.hasAudio).length)} change="Screenshots or audio" icon={Eye} /></div><ChartCard title="Feedback inbox" eyebrow="From the app"><div className="dashboard-feedback-tools"><div className="dashboard-search"><Search size={15}/><input placeholder="Search feedback" value={search} onChange={e => setSearch(e.target.value)} /></div><span>{filteredFeedback.length} notes</span></div><div className="dashboard-feedback-list">{filteredFeedback.map(item => <article className="dashboard-feedback-item" key={item.id}><div className="dashboard-feedback-item-top"><span className={`dashboard-feedback-tag ${item.category === "Bug" ? "bug" : item.category === "Idea" ? "idea" : "ux"}`}>{item.category ?? "Other"}</span><time>{formatDate(item.createdAt)}</time></div><p>{item.message}</p><div className="dashboard-feedback-item-bottom"><span>{item.uid ?? "anonymous"}</span><div>{(item.hasPhotos || item.hasAudio) && <span className="dashboard-media-chip"><Eye size={13}/>media attached</span>}<select value={item.status ?? "new"} onChange={e => setFeedback(current => current.map(feedbackItem => feedbackItem.id === item.id ? { ...feedbackItem, status: e.target.value as FeedbackItem["status"] } : feedbackItem))}><option value="new">New</option><option value="reviewing">Reviewing</option><option value="resolved">Resolved</option></select></div></div></article>)}{!filteredFeedback.length && <div className="dashboard-empty"><Inbox size={24}/><strong>No feedback matches.</strong><span>New in-app feedback will appear here.</span></div>}</div></ChartCard></>}
      </div></main>
  </div>;
};

function EventTable({ events }: { events: AnalyticsEvent[] }) {
  return <div className="dashboard-event-table"><div className="dashboard-event-row dashboard-event-head"><span>Event</span><span>When</span><span>Platform</span><span>User</span></div>{events.map(event => <div className="dashboard-event-row" key={event.id}><span><i className="dashboard-event-dot" />{event.name}</span><span>{formatDate(event.createdAt)}</span><span>{event.platform ?? "—"}</span><span className="dashboard-user-cell">{event.uid ?? "anonymous"}</span></div>)}</div>;
}

export default FlousyDashboard;
