import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WorkCard from "@/components/WorkCard";
import { activityItems, clientItems, engineeringItems, type WorkItem } from "@/data/workItems";
import { useLanguage } from "@/i18n/LanguageContext";

type Tab = "engineering" | "client" | "activity";

const tabs: Array<{ id: Tab; en: string; ar: string; items: WorkItem[] }> = [
  { id: "engineering", en: "Engineering projects", ar: "مشاريع هندسية", items: engineeringItems },
  { id: "client", en: "Client websites", ar: "مواقع العملاء", items: clientItems },
  { id: "activity", en: "Activities", ar: "الأنشطة", items: activityItems }
];

/** The full work list with a tab for each kind. Every card opens its own page. */
export function WorkExplorer({ initial = "engineering", standalone = false }: { initial?: Tab; standalone?: boolean }) {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const [tab, setTab] = useState<Tab>(initial);
  const Heading = standalone ? "h1" : "h2";
  const current = tabs.find((entry) => entry.id === tab)!;
  return (
    <section id="work" className="portfolio-section portfolio-container">
      <header className="section-heading"><p>{arabic ? "كل الشغل" : "All the work"}</p><Heading>{arabic ? "اضغط على أي كارت وافتح صفحته." : "Open any card for the full story."}</Heading></header>
      <div className="work-tabs" role="tablist">
        {tabs.map((entry) => <button key={entry.id} type="button" role="tab" aria-selected={tab === entry.id} className={`work-tab${tab === entry.id ? " is-selected" : ""}`} onClick={() => setTab(entry.id)}>{arabic ? entry.ar : entry.en}<small>{entry.items.length}</small></button>)}
      </div>
      <div className={tab === "activity" ? "work-list" : "work-grid"} key={tab}>
        {current.items.map((item) => <WorkCard key={item.slug} item={item} variant={tab === "activity" ? "row" : "tile"} />)}
      </div>
      <Link to="/skills" className="portfolio-text-link skills-all-link">{arabic ? "تصفح حسب المهارة" : "Browse by skill"}<ArrowRight size={16} aria-hidden /></Link>
    </section>
  );
}

/** Hiring view: engineering projects, each opening its own page. */
export function HiringWork() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="work" className="portfolio-section portfolio-container">
      <header className="section-heading"><p>{arabic ? "للتوظيف" : "For hiring teams"}</p><h2>{arabic ? "شغل هندسي حقيقي، مع الأرقام والحدود." : "Real engineering work, with the numbers and the limits."}</h2></header>
      <div className="work-grid">{engineeringItems.map((item) => <WorkCard key={item.slug} item={item} />)}</div>
      <Link to="/skills" className="portfolio-text-link skills-all-link">{arabic ? "تصفح حسب المهارة" : "Browse by skill"}<ArrowRight size={16} aria-hidden /></Link>
    </section>
  );
}

/** Client view: every site and platform I have built for someone. */
export function ClientWork() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="work" className="portfolio-section portfolio-container">
      <header className="section-heading"><p>{arabic ? "لمشروعك" : "For your project"}</p><h2>{arabic ? "مواقع ومنصات بنيتها لعملاء." : "Sites and platforms I have built for clients."}</h2></header>
      <div className="work-grid">{clientItems.map((item) => <WorkCard key={item.slug} item={item} />)}</div>
    </section>
  );
}
