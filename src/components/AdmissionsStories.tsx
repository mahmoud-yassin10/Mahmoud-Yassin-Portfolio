import { ArrowUpRight, ScanLine, Sun, Waves, GraduationCap, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "@/components/CountUp";
import { useLanguage } from "@/i18n/LanguageContext";
import { projectCards } from "@/data/projectCards";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const fallbackIcons = { "squashvar": ScanLine, "flousy-ai-financial-planner": WalletCards, "true-tutor-learning-platform": GraduationCap, "flood-lens": Waves, "solar-share": Sun } as const;

export default function AdmissionsStories({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="stories" className="portfolio-section portfolio-container selected-work">
      <span id="projects" className="section-anchor" aria-hidden />
      <header className="section-heading"><p>{arabic ? "من الفكرة للاستخدام" : "From questions to working systems"}</p><Heading>{arabic ? "شغل يستحق نظرة أقرب." : "A closer look at the work."}</Heading></header>
      <div className="project-bento">
        {projectCards.map((card) => {
          const Icon = fallbackIcons[card.slug as keyof typeof fallbackIcons];
          return (
            <Link key={card.slug} to={`/projects/${card.slug}`} className={`project-card glass-surface${card.featured ? " is-featured" : ""}`} data-kind={card.imageKind}>
              <div className="project-card-preview">
                {card.image
                  ? <img src={`${base}/images/portfolio/${card.image}`} alt={arabic ? card.imageAltAr : card.imageAlt} loading="lazy" decoding="async" />
                  : <span className="project-card-icon" aria-hidden><Icon size={card.featured ? 54 : 38} strokeWidth={1.2} /></span>}
              </div>
              <div className="project-card-body">
                <span className="project-card-category">{arabic ? card.categoryAr : card.category}</span>
                <h3>{arabic ? card.nameAr : card.name}<span className="project-card-arrow" aria-hidden><ArrowUpRight size={16} /></span></h3>
                <p>{arabic ? card.blurbAr : card.blurb}</p>
                <dl className="project-card-numbers">
                  {card.numbers.map((item) => <div key={item.label}><dt><CountUp value={item.value} /></dt><dd>{arabic ? item.labelAr : item.label}</dd></div>)}
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
