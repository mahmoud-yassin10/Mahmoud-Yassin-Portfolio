import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "@/components/CountUp";
import { useLanguage } from "@/i18n/LanguageContext";
import { timeline } from "@/data/timeline";

const SCROLL_PER_STEP_VH = 55;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Pinned rail. Scroll progress is continuous: the glow glides along the rail, the panels cross-fade,
 * and each panel reveals its details a little at a time as you scroll through its step.
 * Nothing re-renders per frame; progress is written straight to CSS variables.
 */
export default function AdmissionsJourney() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const count = timeline.length;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0;
    let current = 0;
    let frame = 0;

    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      const range = Math.max(rect.height - window.innerHeight, 1);
      target = clamp(-rect.top / range, 0, 1) * count;
    };

    const paint = (p: number) => {
      section.style.setProperty("--head", `${(p / count) * 100}%`);
      section.style.setProperty("--prog", String(p / count));
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const centre = index + 0.5;
        const offset = (index === 0 && p < centre) || (index === count - 1 && p > centre) ? 0 : p - centre;
        const opacity = clamp(1 - (Math.abs(offset) - 0.25) / 0.5, 0, 1);
        panel.style.opacity = String(opacity);
        panel.style.transform = `translateY(${(-offset * 36).toFixed(2)}px) scale(${(1 - Math.abs(offset) * 0.03).toFixed(4)})`;
        panel.style.visibility = opacity <= 0.001 ? "hidden" : "visible";
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
        panel.style.setProperty("--t", clamp(p - index, 0, 1).toFixed(4));
      });
      const next = clamp(Math.floor(p), 0, count - 1);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
        setSeen((value) => Math.max(value, next));
      }
    };

    const tick = () => {
      const delta = target - current;
      current = reduced || Math.abs(delta) < 0.0005 ? target : current + delta * 0.16;
      paint(current);
      frame = Math.abs(target - current) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { readTarget(); if (!frame) frame = requestAnimationFrame(tick); };

    readTarget();
    current = target;
    paint(current);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); };
  }, [count]);

  const jumpTo = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const range = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + (range * (index + 0.5)) / count;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [count]);

  return (
    <section id="journey" ref={sectionRef} className="journey-pin" style={{ height: `calc(100svh + ${count * SCROLL_PER_STEP_VH}vh)` }} aria-label={arabic ? "الرحلة" : "Timeline"}>
      <div className="journey-sticky portfolio-container">
        <header className="section-heading"><p>{arabic ? "الرحلة لحد دلوقتي" : "The journey so far"}</p><h2>{arabic ? "كل مشروع فتح سؤال جديد." : "One project led to the next."}</h2></header>
        <ol className="journey-rail">
          {timeline.map((item, index) => (
            <li key={item.id} className={index < active ? "is-done" : index === active ? "is-active" : undefined}>
              <button type="button" onClick={() => jumpTo(index)} aria-current={index === active ? "step" : undefined}>
                <span className="journey-dot" aria-hidden />
                <span className="journey-rail-label">{arabic ? item.railAr : item.rail}</span>
              </button>
            </li>
          ))}
          <span className="journey-head" aria-hidden />
        </ol>
        <div className="journey-stage">
          {timeline.map((entry, index) => {
            const bullets = arabic ? entry.bulletsAr : entry.bullets;
            return (
              <article key={entry.id} ref={(node) => { panelRefs.current[index] = node; }} className="journey-panel glass-surface" aria-hidden={index !== active} style={{ "--t": 0 } as React.CSSProperties}>
                <div className="journey-panel-text">
                  <p className="journey-period" style={{ "--d": 0 } as React.CSSProperties}>{arabic ? entry.periodAr : entry.period}</p>
                  <h3 style={{ "--d": 0.02 } as React.CSSProperties}>{arabic ? entry.titleAr : entry.title}</h3>
                  <p className="journey-role" style={{ "--d": 0.05 } as React.CSSProperties}>{arabic ? entry.roleAr : entry.role}</p>
                  <p className="journey-summary" style={{ "--d": 0.1 } as React.CSSProperties}>{arabic ? entry.summaryAr : entry.summary}</p>
                  <ul>{bullets.map((line, i) => <li key={line} style={{ "--d": 0.2 + i * 0.12 } as React.CSSProperties}>{line}</li>)}</ul>
                  <div className="journey-tags" style={{ "--d": 0.6 } as React.CSSProperties}>{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {entry.href && <Link className="portfolio-button" style={{ "--d": 0.7 } as React.CSSProperties} to={entry.href} tabIndex={index === active ? 0 : -1}>{arabic ? "اقرأ تفاصيل المشروع" : "Read the case study"}<ArrowUpRight size={16} aria-hidden /></Link>}
                </div>
                {entry.numbers.length > 0 && (
                  <dl className="journey-numbers">
                    {entry.numbers.map((item, i) => <div key={item.label} style={{ "--d": 0.3 + i * 0.12 } as React.CSSProperties}><dt>{index <= seen ? <CountUp value={item.value} /> : <bdi>{item.value}</bdi>}</dt><dd>{arabic ? item.labelAr : item.label}</dd></div>)}
                  </dl>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
