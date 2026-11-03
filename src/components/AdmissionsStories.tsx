import { ArrowUpRight, WalletCards, GraduationCap, Waves, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { featuredStories } from "@/data/admissions";
import { featuredStoriesAr } from "@/data/admissionsAr";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export default function AdmissionsStories({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const stories = arabic ? featuredStoriesAr : featuredStories;
  const main = stories[0];
  return (
    <section id="stories" className="portfolio-section portfolio-container selected-work">
      <span id="projects" className="section-anchor" aria-hidden />
      <header className="section-heading"><p>{arabic ? "من الفكرة للاستخدام" : "From questions to working systems"}</p><Heading>{arabic ? "شغل يستحق نظرة أقرب." : "A closer look at the work."}</Heading></header>
      <article className="flagship-project">
        <Link to={`/projects/${main.slug}`} className="flagship-visual" aria-label={arabic ? "افتح مشروع SquashVAR" : "Explore SquashVAR"}>
          <img src={`${base}/images/portfolio/squashvar-court.webp`} alt={arabic ? "إطار فعلي من SquashVAR بيعرض معايرة الملعب وتتبع الكرة" : "Actual SquashVAR output showing calibrated court planes and the ball trajectory"} width="1440" height="810" loading="lazy" />
        </Link>
        <div className="flagship-copy">
          <span className="project-category">{arabic ? "الرؤية الحاسوبية / البحث" : "Computer vision / Research"}</span>
          <h3>{main.name}</h3><p className="project-role">{main.role}</p><p>{main.built}</p>
          <div className="project-result"><strong><bdi>0.911</bdi></strong><span>{arabic ? "mAP@50 لكاشف الكرة، مش دقة قرار الخط" : "Detector mAP@50, not line-call accuracy"}</span></div>
          <Link to={`/projects/${main.slug}`} className="portfolio-text-link">{arabic ? "اقرأ تفاصيل المشروع" : "Read the case study"}<ArrowUpRight size={18} aria-hidden /></Link>
        </div>
      </article>
      <div className="supporting-projects">
        {stories.slice(1).map((story, index) => {
          const Icon = index === 0 ? WalletCards : GraduationCap;
          return <article className="supporting-project" key={story.slug}>
            <div className={`project-identity project-identity-${index}`}><Icon size={34} strokeWidth={1.25} aria-hidden /><span>{story.name}</span></div>
            <div className="supporting-project-copy"><p className="project-role">{story.role}</p><h3>{index === 0 ? (arabic ? "قرار مالي أوضح." : "A clearer financial decision.") : (arabic ? "برامج الطلبة بيعتمدوا عليها." : "Software students depend on.")}</h3><p>{story.built}</p>
              <details className="project-evidence"><summary>{arabic ? "شوف الأدلة" : "Explore the evidence"}</summary><ul>{story.evidence.map((line) => <li key={line}>{line}</li>)}</ul></details>
              <Link to={`/projects/${story.slug}`} className="portfolio-text-link">{arabic ? "اقرأ تفاصيل المشروع" : "Read the case study"}<ArrowUpRight size={18} aria-hidden /></Link>
            </div>
          </article>;
        })}
      </div>
      <div className="project-explorations">
        <Link to="/projects/flood-lens"><Waves size={25} aria-hidden /><span><strong>Flood Lens</strong><small>{arabic ? "تصوّر مخاطر الفيضان / NASA Space Apps" : "Risk visualization / NASA Space Apps"}</small></span><ArrowUpRight size={20} aria-hidden /></Link>
        <Link to="/projects/solar-share"><Sun size={25} aria-hidden /><span><strong>Solar Share</strong><small>{arabic ? "مشاركة الطاقة / أفضل فكرة في Ignited" : "Solar sharing / Ignited Best Idea Award"}</small></span><ArrowUpRight size={20} aria-hidden /></Link>
      </div>
    </section>
  );
}
