import { ArrowLeft, ArrowUpRight, ScanLine, Sun, Waves, GraduationCap, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";
import { projectCards } from "@/data/projectCards";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const icons = { "squashvar": ScanLine, "flousy-ai-financial-planner": WalletCards, "true-tutor-learning-platform": GraduationCap, "flood-lens": Waves, "solar-share": Sun } as const;

/** Hero for case-study pages that share the SquashVAR layout: copy and actions left, preview right. */
export default function ProjectCaseHero({ project, study }: { project: Project; study: CaseStudy }) {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const card = projectCards.find((item) => item.slug === project.slug);
  const Icon = icons[project.slug as keyof typeof icons] ?? ScanLine;
  const [primary, ...secondary] = study.links ?? [];
  const phones = project.slug === "flousy-ai-financial-planner";
  return (
    <>
      <div className="sq-hero project-case-hero">
        <div className="sq-hero-copy">
          <Link className="sq-back-link" to="/#stories"><ArrowLeft size={17} aria-hidden />{arabic ? "كل المشاريع" : "All projects"}</Link>
          <p className="sq-category">{arabic ? card?.categoryAr : card?.category}</p>
          <h1>{arabic ? card?.nameAr ?? project.title : card?.name ?? project.title}</h1>
          <p className="sq-lead">{study.tagline}</p>
          {study.status && <p className="sq-publication-status">{study.status}</p>}
          <div className="sq-hero-actions">
            {primary && <a className="portfolio-button" href={primary.href} target="_blank" rel="noreferrer">{primary.label}<ArrowUpRight size={17} aria-hidden /></a>}
            {secondary.map((link) => <a key={link.href} className="portfolio-text-link" href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={17} aria-hidden /></a>)}
          </div>
        </div>
        <figure className={`sq-hero-figure project-case-figure${phones ? " is-phones" : ""}`}>
          {phones ? (
            <div className="project-case-phones glass-surface">
              <img src={`${base}/images/portfolio/flousy-activity.webp`} alt={arabic ? "شاشة النشاط في فلوسي" : "Flousy Activity screen"} loading="eager" />
              <img src={`${base}/images/portfolio/flousy-ai.webp`} alt={arabic ? "شاشة مساعد فلوسي" : "Flousy AI chat screen"} loading="eager" />
            </div>
          ) : card?.image ? (
            <img src={`${base}/images/portfolio/${card.image}`} alt={arabic ? card.imageAltAr : card.imageAlt} />
          ) : (
            <div className="project-case-icon glass-surface"><Icon size={72} strokeWidth={1.1} aria-hidden /></div>
          )}
        </figure>
      </div>
      <dl className="sq-project-meta">
        <div><dt>{arabic ? "الفترة" : "Period"}</dt><dd>{project.period}</dd></div>
        <div><dt>{arabic ? "أدوات" : "Built with"}</dt><dd>{project.tech.join(" · ")}</dd></div>
      </dl>
    </>
  );
}
