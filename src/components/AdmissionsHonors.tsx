import type { CSSProperties, PointerEvent } from "react";
import { Award, Code2, FlaskConical, GraduationCap, Lightbulb, Mic, Rocket, Sigma, Trophy } from "lucide-react";
import { honors } from "@/data/admissions";
import { honorsAr } from "@/data/admissionsAr";
import { useLanguage } from "@/i18n/LanguageContext";

const iconFor = (org: string) => {
  const text = org.toLowerCase();
  if (/usaco|icsc|eocs|computer|computational|olympiad/.test(text)) return Code2;
  if (/sawiris|scholar|منحة|سويرس/.test(text)) return GraduationCap;
  if (/lumiere|research|لوميير|بحث/.test(text)) return FlaskConical;
  if (/nasa|space/.test(text)) return Rocket;
  if (/ignited/.test(text)) return Lightbulb;
  if (/aastmt|math|رياض/.test(text)) return Sigma;
  if (/speech|خطابة|إلقاء/.test(text)) return Mic;
  if (/squash|اسكواش|سكواش/.test(text)) return Trophy;
  return Award;
};

const follow = (event: PointerEvent<HTMLLIElement>) => {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
};

export default function AdmissionsHonors() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const items = arabic ? honorsAr : honors;
  return <section id="honors" className="portfolio-section portfolio-container">
    <header className="section-heading"><h2>{arabic ? "محطات تستحق التقدير." : "Recognition along the way."}</h2></header>
    <ul className="honor-grid">
      {items.map((honor) => {
        const Icon = iconFor(`${honor.org} ${honor.title}`);
        return <li key={`${honor.org}-${honor.title}`} className="honor-tile glass-surface" tabIndex={0} onPointerMove={follow} style={{ "--mx": "50%", "--my": "0%" } as CSSProperties}>
          <span className="honor-icon"><Icon size={22} strokeWidth={1.5} aria-hidden /></span>
          <h3>{honor.title}</h3>
          <div className="honor-reveal"><p>{honor.org}</p>{honor.year && <time>{honor.year}</time>}</div>
        </li>;
      })}
    </ul>
  </section>;
}
