import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "@/components/CountUp";
import { useLanguage } from "@/i18n/LanguageContext";
import { timeline } from "@/data/timeline";

/** Pinned rail: the section stays on screen while scrolling moves the glow from step to step. */
export default function AdmissionsJourney() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = timeline.length;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const range = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / range, 0), 0.9999);
      setActive(Math.floor(progress * count));
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [count]);

  const jumpTo = useCallback((index: number) => {
    const node = ref.current;
    if (!node) return;
    const range = node.offsetHeight - window.innerHeight;
    const top = node.getBoundingClientRect().top + window.scrollY + (range * (index + 0.5)) / count;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [count]);

  const entry = timeline[active];
  const fill = ((active + 0.5) / count) * 100;

  return (
    <section id="journey" ref={ref} className="journey-pin" style={{ height: `${count * 62 + 40}vh` }} aria-label={arabic ? "الرحلة" : "Timeline"}>
      <div className="journey-sticky portfolio-container">
        <header className="section-heading"><p>{arabic ? "الرحلة لحد دلوقتي" : "The journey so far"}</p><h2>{arabic ? "كل مشروع فتح سؤال جديد." : "One project led to the next."}</h2></header>
        <ol className="journey-rail" style={{ "--fill": `${fill}%` } as React.CSSProperties}>
          {timeline.map((item, index) => (
            <li key={item.id} className={index < active ? "is-done" : index === active ? "is-active" : undefined}>
              <button type="button" onClick={() => jumpTo(index)} aria-current={index === active ? "step" : undefined}>
                <span className="journey-dot" aria-hidden />
                <span className="journey-rail-label">{arabic ? item.railAr : item.rail}</span>
              </button>
            </li>
          ))}
        </ol>
        <article key={entry.id} className="journey-panel glass-surface" aria-live="polite">
          <div className="journey-panel-text">
            <p className="journey-period">{arabic ? entry.periodAr : entry.period}</p>
            <h3>{arabic ? entry.titleAr : entry.title}</h3>
            <p className="journey-role">{arabic ? entry.roleAr : entry.role}</p>
            <p className="journey-summary">{arabic ? entry.summaryAr : entry.summary}</p>
            <ul>{(arabic ? entry.bulletsAr : entry.bullets).map((line) => <li key={line}>{line}</li>)}</ul>
            <div className="journey-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            {entry.href && <Link className="portfolio-button" to={entry.href}>{arabic ? "اقرأ تفاصيل المشروع" : "Read the case study"}<ArrowUpRight size={16} aria-hidden /></Link>}
          </div>
          {entry.numbers.length > 0 && (
            <dl className="journey-numbers">
              {entry.numbers.map((item) => <div key={item.label}><dt><CountUp value={item.value} /></dt><dd>{arabic ? item.labelAr : item.label}</dd></div>)}
            </dl>
          )}
        </article>
      </div>
    </section>
  );
}
