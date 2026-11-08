import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WorkCard from "@/components/WorkCard";
import { getSkill, skillCatalog } from "@/data/skillCatalog";
import { itemsForSkill, relatedSkills } from "@/data/workItems";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/squashvar.css";

/** Everything that uses one skill, plus related skills and neighbors in the same group. */
export default function SkillPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const { audience } = useAudience();
  const includeActivities = audience === "admissions";
  const arabic = lang === "ar";
  const skill = slug ? getSkill(slug) : undefined;
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!skill) return <Navigate to="/skills" replace />;

  const items = itemsForSkill(skill.slug, includeActivities);
  const projects = items.filter((item) => item.kind === "engineering");
  const clients = items.filter((item) => item.kind === "client");
  const activities = items.filter((item) => item.kind === "activity");
  const related = relatedSkills(skill.slug, 8, includeActivities);
  const sameGroup = skillCatalog.filter((entry) => entry.group === skill.group && entry.slug !== skill.slug && itemsForSkill(entry.slug, includeActivities).length > 0);
  const label = (en: string, ar: string) => (arabic ? ar : en);
  const section = (title: string, list: typeof items) => list.length > 0 && (
    <section className="squash-case-section" aria-label={title}>
      <header className="sq-section-heading"><h2>{title}</h2></header>
      <div className="work-grid">{list.map((item) => <WorkCard key={item.slug} item={item} />)}</div>
    </section>
  );

  return <div className="squash-case-page relative min-h-screen bg-background text-foreground">
    <AnimatedBackground />
    <Navbar />
    <main id="main-content" className="squash-case-main relative z-10">
      <div className="portfolio-container">
        <Link to="/skills" className="sq-back-link"><ArrowLeft size={16} aria-hidden />{label("All skills", "كل المهارات")}</Link>
        <header className="skill-hero">
          <p className="sq-category">{skill.group}</p>
          <h1>{skill.name}</h1>
          <p className="sq-lead">{skill.blurb}</p>
          <dl className="wk-numbers skill-hero-numbers">
            <div className="glass-surface"><dt><CountUp value={String(items.length)} /></dt><dd>{label("pieces of work", "أعمال")}</dd></div>
            <div className="glass-surface"><dt><CountUp value={String(projects.length)} /></dt><dd>{label("projects", "مشاريع")}</dd></div>
            <div className="glass-surface"><dt><CountUp value={String(clients.length)} /></dt><dd>{label("client sites", "مواقع عملاء")}</dd></div>
          </dl>
        </header>

        {section(label("Projects", "المشاريع"), projects)}
        {section(label("Client sites", "مواقع العملاء"), clients)}
        {includeActivities && section(label("Activities", "الأنشطة"), activities)}

        {related.length > 0 && (
          <section className="squash-case-section" aria-label={label("Often used with", "بتتستخدم مع")}>
            <header className="sq-section-heading"><h2>{label("Often used with.", "بتتستخدم مع.")}</h2><p>{label("Skills that show up in the same work.", "مهارات بتظهر في نفس الشغل.")}</p></header>
            <ul className="skill-chip-grid">
              {related.map(({ skill: other, shared }) => (
                <li key={other.slug}><Link to={`/skills/${other.slug}`} className="skill-chip"><span><strong>{other.name}</strong><small>{other.group}</small></span><em>{shared} {label("together", "مع بعض")}</em><ArrowRight size={16} aria-hidden /></Link></li>
              ))}
            </ul>
          </section>
        )}

        {sameGroup.length > 0 && (
          <section className="squash-case-section sq-resources" aria-label={label("More in this group", "المزيد في نفس المجموعة")}>
            <header className="sq-section-heading"><h2>{label("More", "المزيد من")} {skill.group.toLowerCase()}.</h2></header>
            <ul className="skill-pills">{sameGroup.map((entry) => <li key={entry.slug}><Link to={`/skills/${entry.slug}`}>{entry.name}<small>{itemsForSkill(entry.slug, includeActivities).length}</small></Link></li>)}</ul>
            <Link to="/skills" className="portfolio-text-link skills-all-link">{label("Explore all skills", "كل المهارات")}<ArrowRight size={16} aria-hidden /></Link>
          </section>
        )}
      </div>
    </main>
    <Footer />
  </div>;
}
