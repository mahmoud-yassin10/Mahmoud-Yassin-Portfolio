import { useEffect, useMemo, useState, type FormEvent } from "react";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, type User } from "firebase/auth";
import { BookOpen, CalendarDays, ChevronRight, CircleAlert, Code2, KeyRound, LogIn, LogOut, Plus, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import PythonWorkspace from "@/components/PythonWorkspace";
import { hubAuth, hubDb, hubFunctions, isHubFirebaseConfigured } from "@/lib/hubFirebase";

type HubRole = "teacher" | "student";
type Assignment = { id: string; title: string; description: string; dueAt?: string; starterCode?: string; status?: string };

function HubLogin({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!hubAuth) return;
    setLoading(true); setError("");
    try { const result = await signInWithEmailAndPassword(hubAuth, email.trim(), password); onLogin(result.user); }
    catch { setError("That sign-in did not work. Check your email and password."); }
    finally { setLoading(false); }
  };
  return <div className="hub-auth-page"><AnimatedBackground /><div className="hub-auth-card"><div className="hub-brand"><span className="hub-brand-mark"><Sparkles size={17} /></span><span>MAHMOUD / HUB</span></div><div className="hub-auth-heading"><span className="hub-eyebrow">Student workspace</span><h1>Make progress visible.</h1><p>A focused place to learn, practice Python, and submit work for review.</p></div><form className="hub-auth-form" onSubmit={submit}><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <div className="hub-error"><CircleAlert size={15} />{error}</div>}<button className="hub-button hub-button-primary hub-auth-submit" disabled={loading}><LogIn size={16} />{loading ? "Signing in…" : "Enter the hub"}</button></form><div className="hub-auth-foot"><ShieldCheck size={14} /> Accounts are created by Mahmoud.</div></div></div>;
}

function HubSetup() {
  return <div className="hub-auth-page"><AnimatedBackground /><div className="hub-auth-card"><div className="hub-brand"><span className="hub-brand-mark"><Sparkles size={17} /></span><span>MAHMOUD / HUB</span></div><span className="hub-eyebrow">Private workspace</span><h1>Connect the hub.</h1><p>The separate Student Hub Firebase project is ready to be connected. Add its web app values using the <code>VITE_HUB_FIREBASE_*</code> variables before enabling student accounts.</p><div className="hub-setup-list"><span><CheckIcon /> Separate Firebase app</span><span><CheckIcon /> Student accounts and assignments</span><span><CheckIcon /> Browser-based Python runner</span></div></div></div>;
}

function CheckIcon() { return <span className="hub-check-icon">✓</span>; }

const sampleAssignments: Assignment[] = [
  { id: "starter-python", title: "Functions and return values", description: "Write small functions, call them with different inputs, and inspect the output.", dueAt: "This week", starterCode: "def double(number):\n    return number * 2\n\nprint(double(8))" },
];

function StudentView({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [assignments, setAssignments] = useState<Assignment[]>(sampleAssignments);
  const [active, setActive] = useState<Assignment>(sampleAssignments[0]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!hubDb) return;
    void getDocs(query(collection(hubDb, "hub_assignments"), orderBy("createdAt", "desc"))).then((snapshot) => {
      const next = snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Assignment, "id">) }));
      if (next.length) { setAssignments(next); setActive(next[0]); }
    }).catch(() => setNotice("Live assignments are not available yet. Showing the starter workspace."));
  }, []);
  const submitHomework = async (code: string, output: string) => {
    if (!hubDb) { setNotice("Connect the Student Hub Firebase project to save submissions."); return; }
    await addDoc(collection(hubDb, "hub_submissions"), { assignmentId: active.id, studentUid: user.uid, code, output, status: "submitted", submittedAt: serverTimestamp() });
    setNotice("Homework submitted for review.");
  };
  return <HubShell user={user} role="student" onLogout={onLogout}><div className="hub-page-heading"><div><span className="hub-eyebrow">Student dashboard</span><h1>Keep the next step close.</h1><p>Your assignments, practice space, and feedback in one place.</p></div><div className="hub-heading-stats"><span><strong>1</strong><small>active assignment</small></span><span><strong>0</strong><small>submissions reviewed</small></span></div></div>{notice && <div className="hub-notice"><CircleAlert size={15} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={14} /></button></div>}<div className="hub-student-grid"><section className="hub-card hub-assignment-list"><div className="hub-card-head"><div><span className="hub-eyebrow">Your queue</span><h2>Assignments</h2></div><BookOpen size={18} /></div>{assignments.map((assignment) => <button type="button" key={assignment.id} onClick={() => setActive(assignment)} className={`hub-assignment-row ${active.id === assignment.id ? "active" : ""}`}><span className="hub-assignment-icon"><Code2 size={17} /></span><span><strong>{assignment.title}</strong><small>{assignment.dueAt ?? "No deadline"}</small></span><ChevronRight size={16} /></button>)}</section><section className="hub-card hub-progress-card"><div className="hub-card-head"><div><span className="hub-eyebrow">Progress signal</span><h2>Python foundations</h2></div><span className="hub-progress-value">0%</span></div><div className="hub-progress-track"><span style={{ width: "0%" }} /></div><p>Complete your first assignment to start building a learning history.</p><div className="hub-progress-meta"><span><CalendarDays size={14} /> {active.dueAt ?? "Open practice"}</span><span><Sparkles size={14} /> Standard Python</span></div></section></div><PythonWorkspace assignmentTitle={active.title} initialCode={active.starterCode} onSubmit={submitHomework} /></HubShell>;
}

function TeacherView({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const createStudent = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      if (!hubFunctions) throw new Error("Hub functions are not configured.");
      const call = httpsCallable(hubFunctions, "createHubStudent");
      await call({ email: studentEmail.trim(), name: studentName.trim(), temporaryPassword });
      setNotice("Student account created. Share the temporary password securely."); setStudentEmail(""); setStudentName(""); setTemporaryPassword("");
    } catch { setNotice("Student creation is not connected yet. Deploy the separate Hub create-student function first."); }
    finally { setBusy(false); }
  };
  const createAssignment = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      if (!hubDb) throw new Error("Hub database is not configured.");
      await addDoc(collection(hubDb, "hub_assignments"), { title: assignmentTitle.trim(), description: assignmentDescription.trim(), starterCode, published: true, createdBy: user.uid, createdAt: serverTimestamp() });
      setNotice("Assignment published."); setAssignmentTitle(""); setAssignmentDescription(""); setStarterCode("");
    } catch { setNotice("Assignment could not be published. Check the Hub Firebase configuration and rules."); }
    finally { setBusy(false); }
  };
  return <HubShell user={user} role="teacher" onLogout={onLogout}><div className="hub-page-heading"><div><span className="hub-eyebrow">Teacher workspace</span><h1>Shape the next lesson.</h1><p>Create students, publish homework, and review what comes back.</p></div><div className="hub-heading-stats"><span><strong>0</strong><small>students connected</small></span><span><strong>0</strong><small>submissions to review</small></span></div></div>{notice && <div className="hub-notice"><CircleAlert size={15} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={14} /></button></div>}<div className="hub-teacher-grid"><section className="hub-card"><div className="hub-card-head"><div><span className="hub-eyebrow">Roster</span><h2>Create a student account</h2></div><Users size={18} /></div><form className="hub-form" onSubmit={createStudent}><label>Student name<input value={studentName} onChange={(event) => setStudentName(event.target.value)} required /></label><label>Student email<input type="email" value={studentEmail} onChange={(event) => setStudentEmail(event.target.value)} required /></label><label>Temporary password<input type="password" minLength={8} value={temporaryPassword} onChange={(event) => setTemporaryPassword(event.target.value)} required /></label><button className="hub-button hub-button-primary" disabled={busy}><Plus size={15} />Create account</button></form></section><section className="hub-card"><div className="hub-card-head"><div><span className="hub-eyebrow">Assignment builder</span><h2>Publish homework</h2></div><BookOpen size={18} /></div><form className="hub-form" onSubmit={createAssignment}><label>Title<input value={assignmentTitle} onChange={(event) => setAssignmentTitle(event.target.value)} required /></label><label>Instructions<textarea value={assignmentDescription} onChange={(event) => setAssignmentDescription(event.target.value)} rows={4} required /></label><label>Starter Python<textarea className="hub-form-code" value={starterCode} onChange={(event) => setStarterCode(event.target.value)} rows={5} spellCheck={false} /></label><button className="hub-button hub-button-primary" disabled={busy}><Plus size={15} />Publish assignment</button></form></section></div></HubShell>;
}

function HubShell({ user, role, onLogout, children }: { user: User; role: HubRole; onLogout: () => void; children: React.ReactNode }) {
  const [showAccount, setShowAccount] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [accountNotice, setAccountNotice] = useState("");
  const changePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (newPassword.length < 8) { setAccountNotice("Use at least 8 characters."); return; }
    try { await updatePassword(user, newPassword); setNewPassword(""); setAccountNotice("Password updated."); }
    catch { setAccountNotice("For security, sign in again before changing your password."); }
  };
  return <div className="hub-shell"><AnimatedBackground /><header className="hub-topbar"><div className="hub-topbar-brand"><span className="hub-brand-mark"><Sparkles size={16} /></span><div><strong>MAHMOUD / HUB</strong><small>{role === "teacher" ? "teaching workspace" : "student workspace"}</small></div></div><div className="hub-topbar-actions"><ThemeToggle /><span className="hub-user-chip">{user.email}</span><button type="button" className="hub-icon-button" onClick={() => setShowAccount((open) => !open)} title="Account settings" aria-label="Account settings"><KeyRound size={16} /></button><button type="button" className="hub-icon-button" onClick={onLogout} title="Sign out" aria-label="Sign out"><LogOut size={16} /></button></div>{showAccount && <div className="hub-account-popover"><span className="hub-eyebrow">Account security</span><strong>Change your password</strong><form onSubmit={changePassword}><input type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password" autoComplete="new-password" required /><button className="hub-button hub-button-primary" type="submit">Update password</button></form>{accountNotice && <small>{accountNotice}</small>}</div>}</header><main className="hub-main">{children}</main></div>;
}

const HubPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<HubRole>("student");
  const [authLoading, setAuthLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    if (!hubAuth) { setAuthLoading(false); return undefined; }
    return onAuthStateChanged(hubAuth, (nextUser) => { setUser(nextUser); setAuthLoading(false); });
  }, []);

  useEffect(() => {
    if (!user || !hubDb) { setRole("student"); return; }
    setRoleLoading(true);
    void getDoc(doc(hubDb, "hub_teachers", user.uid)).then((snapshot) => {
      setRole(snapshot.exists() && snapshot.data().role === "teacher" ? "teacher" : "student");
    }).catch(() => setRole("student")).finally(() => setRoleLoading(false));
  }, [user]);

  const content = useMemo(() => {
    if (!user) return null;
    if (roleLoading) return <div className="hub-loading-state"><span className="hub-loading-orb"><Sparkles size={20} /></span><p>Preparing your workspace…</p></div>;
    return role === "teacher" ? <TeacherView user={user} onLogout={() => { void signOut(hubAuth!); }} /> : <StudentView user={user} onLogout={() => { void signOut(hubAuth!); }} />;
  }, [role, roleLoading, user]);

  if (authLoading) return <div className="hub-loading-state"><AnimatedBackground /><span className="hub-loading-orb"><Sparkles size={20} /></span><p>Connecting to the hub…</p></div>;
  if (!isHubFirebaseConfigured || !hubAuth) return <HubSetup />;
  if (!user) return <HubLogin onLogin={setUser} />;
  return content;
};

export default HubPage;
