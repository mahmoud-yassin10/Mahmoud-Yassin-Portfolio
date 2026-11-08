import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const SEEN = "flousy-intro-seen";

/** A short opening animation: the logo, a market line that draws itself, and a safe-to-spend number that counts up. */
export default function FlousyIntro({ arabic }: { arabic: boolean }) {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">(() => {
    if (typeof window === "undefined") return "gone";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "gone";
    try { return window.sessionStorage.getItem(SEEN) === "1" ? "gone" : "show"; } catch { return "show"; }
  });

  useEffect(() => {
    if (phase === "gone") return;
    try { window.sessionStorage.setItem(SEEN, "1"); } catch { /* storage can be blocked */ }
    const leave = window.setTimeout(() => setPhase("leave"), 2300);
    const gone = window.setTimeout(() => setPhase("gone"), 2900);
    return () => { window.clearTimeout(leave); window.clearTimeout(gone); };
  }, [phase === "gone"]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "gone") return null;
  return (
    <div className={`fl-intro${phase === "leave" ? " is-leaving" : ""}`} role="status" aria-label={arabic ? "فلوسي بيحمّل" : "Loading Flousy"} onClick={() => setPhase("gone")}>
      <div className="fl-intro-inner">
        <div className="fl-intro-logo"><img src={`${base}/images/flousy/logo.png`} alt="" width="84" height="84" /></div>
        <svg className="fl-intro-chart" viewBox="0 0 320 90" fill="none" aria-hidden>
          <defs><linearGradient id="fl-intro-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4F7BFF" /><stop offset="1" stopColor="#35D3F5" /></linearGradient></defs>
          <path className="fl-intro-area" d="M4 78 C40 70 56 40 90 52 S140 78 176 46 S240 30 316 8 L316 88 L4 88 Z" />
          <path className="fl-intro-line" d="M4 78 C40 70 56 40 90 52 S140 78 176 46 S240 30 316 8" stroke="url(#fl-intro-grad)" strokeWidth="4" strokeLinecap="round" />
          <circle className="fl-intro-dot" cx="316" cy="8" r="6" fill="#35D3F5" />
        </svg>
        <p className="fl-intro-number"><CountUp value="EGP 12,265" duration={1500} /></p>
        <p className="fl-intro-label">{arabic ? "اللي تقدر تصرفه بأمان" : "safe to spend"}</p>
      </div>
    </div>
  );
}
