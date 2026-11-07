import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Briefcase, Code2, Globe2, HeartHandshake, Info, Trophy } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SkillsUsed from "@/components/SkillsUsed";
import WorkCard from "@/components/WorkCard";
import { getWorkItem, itemHref, similarItems } from "@/data/workItems";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/squashvar.css";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Full page for any work item without its own case study: projects, client sites and activities. */
export default function WorkDetailPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const item = slug ? getWorkItem(slug) : undefined;
  const [active, setActive] = useState("wk-overview");

  const sections = item ? [
    { id: "wk-overview", label: arabic ? "الفكرة" : "Overview", show: true },
    { id: "wk-built", label: arabic ? "اللي عملته" : "What I did", show: item.built.length > 0 },
    { id: "wk-numbers", label: arabic ? "الأرقام" : "In numbers", show: item.numbers.length > 0 },
    { id: "skills-used", label: arabic ? "المهارات" : "Skills", show: item.skills.length > 0 },
    { id: "wk-more", label: arabic ? "أعمال مشابهة" : "Similar work", show: true }
  ].filter((section) => section.show) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-175px 0px -55% 0px", threshold: 0 });
    sections.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) return <Navigate to="/work" replace />;
  if (item.caseStudy) return <Navigate to={itemHref(item)} replace />;

  const Icon = item.kind === "client" ? Globe2 : item.kind === "activity" ? (item.category === "Sport" ? Trophy : item.category === "Build" ? Briefcase : HeartHandshake) : Code2;
  const back = item.kind === "activity" ? { to: "/#activities", label: arabic ? "كل الأنشطة" : "All activities" } : { to: "/work", label: arabic ? "كل الشغل" : "All work" };
  const [primary, ...secondary] = item.links;
  const similar = similarItems(item);
  const label = (en: string, ar: string) => (arabic ? ar : en);

  return <div className="squash-case-page relative min-h-screen bg-background text-foreground">
    <AnimatedBackground />
    <Navbar />
    <main id="main-content" className="squash-case-main relative z-10">
      <div className="portfolio-container">
        <Link to={back.to} className="sq-back-link"><ArrowLeft size={16} aria-hidden />{back.label}</Link>
        <header className="sq-hero">
          <div className="sq-hero-copy">
            <p className="sq-category">{item.category}</p>
            <h1>{item.name}</h1>
            <p className="sq-lead">{item.summary}</p>
            <p className="sq-publication-status">{item.status}</p>
            {primary && (
              <div className="sq-hero-actions">
                {isExternal(primary.href)
                  ? <a href={primary.href} target="_blank" rel="noreferrer" className="portfolio-button">{primary.label}<ArrowUpRight size={16} aria-hidden /></a>
                  : <Link to={primary.href} className="portfolio-button">{primary.label}<ArrowUpRight size={16} aria-hidden /></Link>}
                {secondary.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="portfolio-text-link">{link.label}<ArrowUpRight size={16} aria-hidden /></a>)}
              </div>
            )}
          </div>
          <figure className="sq-hero-figure project-case-figure">
            {item.image ? <img src={`${base}${item.image}`} alt={`${item.name}`} width="1440" height="900" decoding="async" /> : <div className="project-case-icon glass-surface"><Icon size={72} strokeWidth={1.1} aria-hidden /></div>}
          </figure>
        </header>
        <dl className="sq-project-meta">
          <div><dt>{label("Role", "الدور")}</dt><dd>{item.role}</dd></div>
          <div><dt>{label("Period", "الفترة")}</dt><dd>{item.period}</dd></div>
        </dl>

        <nav className="section-rail sq-section-rail" aria-label={label("Sections", "الأقسام")}>
          {sections.map((section) => <a key={section.id} href={`#${section.id}`} className={active === section.id ? "is-active" : undefined} aria-current={active === section.id ? "location" : undefined}><span>{section.label}</span><i aria-hidden /></a>)}
        </nav>

        <section id="wk-overview" className="squash-case-section" aria-labelledby="wk-overview-title">
          <header className="sq-section-heading"><h2 id="wk-overview-title">{label("The story.", "القصة.")}</h2></header>
          <div className="wk-prose">{item.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {item.note && <div className="sq-measurement-boundary"><Info size={22} aria-hidden /><div><h3>{label("Worth knowing", "مهم تعرفه")}</h3><p>{item.note}</p></div></div>}
        </section>

        {item.built.length > 0 && (
          <section id="wk-built" className="squash-case-section" aria-labelledby="wk-built-title">
            <header className="sq-section-heading"><h2 id="wk-built-title">{label("What I did.", "اللي عملته.")}</h2></header>
            <ul className="wk-built-list">{item.built.map((line, index) => <li key={line} className="glass-surface"><span>{String(index + 1).padStart(2, "0")}</span><p>{line}</p></li>)}</ul>
          </section>
        )}

        {item.numbers.length > 0 && (
          <section id="wk-numbers" className="squash-case-section" aria-labelledby="wk-numbers-title">
            <header className="sq-section-heading"><h2 id="wk-numbers-title">{label("In numbers.", "بالأرقام.")}</h2></header>
            <dl className="wk-numbers">{item.numbers.map((entry) => <div key={entry.label} className="glass-surface"><dt><CountUp value={entry.value} /></dt><dd>{entry.label}</dd></div>)}</dl>
          </section>
        )}

        <SkillsUsed itemSlug={item.slug} />

        <section id="wk-more" className="squash-case-section sq-resources" aria-labelledby="wk-more-title">
          <header className="sq-section-heading"><h2 id="wk-more-title">{label("More like this.", "المزيد زي ده.")}</h2></header>
          <div className="work-grid">{similar.map((entry) => <WorkCard key={entry.slug} item={entry} />)}</div>
          <Link to={item.kind === "activity" ? "/#activities" : "/work"} className="portfolio-text-link skills-all-link">{back.label}<ArrowUpRight size={16} aria-hidden /></Link>
        </section>
      </div>
    </main>
    <Footer />
  </div>;
}
