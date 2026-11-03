import { Award, ArrowDown } from "lucide-react";
import { honors } from "@/data/admissions";
import { honorsAr } from "@/data/admissionsAr";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AdmissionsHonors() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const items = arabic ? honorsAr : honors;
  const renderHonor = (honor: typeof items[number]) => <li key={`${honor.org}-${honor.title}`}><Award size={22} strokeWidth={1.5} aria-hidden /><div><h3>{honor.title}</h3><p>{honor.org}</p></div>{honor.year && <time>{honor.year}</time>}</li>;
  return <section id="honors" className="portfolio-section portfolio-container">
    <header className="section-heading"><h2>{arabic ? "محطات تستحق التقدير." : "Recognition along the way."}</h2></header>
    <ul className="honors-list">{items.slice(0,6).map(renderHonor)}</ul>
    <details className="more-honors"><summary>{arabic ? "شوف باقي الجوائز" : "Explore all honors"}<ArrowDown size={16} aria-hidden /></summary><ul className="honors-list">{items.slice(6).map(renderHonor)}</ul></details>
  </section>;
}
