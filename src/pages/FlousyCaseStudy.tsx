import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUpRight, FileText, Globe2, Info, MessageSquareText, Languages, Smartphone, SlidersHorizontal, WalletCards } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsUsed from "@/components/SkillsUsed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
import { FLOUSY_PLAY_STORE_URL } from "@/data/projectLinks";
import { FLOUSY_SITE_URL, flousyCopy } from "@/data/flousyCaseStudy";
import "@/styles/squashvar.css";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const sectionIds = ["fl-overview", "fl-preview", "fl-system", "fl-results", "fl-limitations", "fl-links"];
const stageIcons = [Smartphone, SlidersHorizontal, WalletCards, MessageSquareText, Languages];

/** Flousy case study. Same page structure and styles as the SquashVAR case study. */
export default function FlousyCaseStudy() {
  const { lang, dir } = useLanguage();
  const c = flousyCopy[lang];
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [stage, setStage] = useState("0");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-175px 0px -55% 0px", threshold: 0 });
    sectionIds.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>(`a[href="#${activeSection}"]`);
    if (!nav || !active) return;
    const viewport = nav.getBoundingClientRect();
    const target = active.getBoundingClientRect();
    if (target.left < viewport.left || target.right > viewport.right) {
      nav.scrollBy({ left: target.left - viewport.left - (viewport.width - target.width) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }, [activeSection, lang]);

  return <div className="squash-case-page relative min-h-screen bg-background text-foreground">
    <AnimatedBackground />
    <Navbar />
    <main id="main-content" className="squash-case-main relative z-10">
      <div className="portfolio-container">
        <Link to="/work" className="sq-back-link"><ArrowLeft size={16} aria-hidden />{c.back}</Link>
        <header className="sq-hero">
          <div className="sq-hero-copy">
            <p className="sq-category">{c.category}</p>
            <h1>{lang === "ar" ? "فلوسي" : "Flousy"}</h1>
            <p className="sq-lead">{c.lead}</p>
            <p className="sq-publication-status"><FileText size={16} aria-hidden />{c.status}</p>
            <div className="sq-hero-actions">
              <a href={FLOUSY_PLAY_STORE_URL} target="_blank" rel="noreferrer" className="portfolio-button">{c.play}<ArrowUpRight size={16} aria-hidden /></a>
              <a href={FLOUSY_SITE_URL} target="_blank" rel="noreferrer" className="portfolio-text-link"><Globe2 size={17} aria-hidden />{c.site}</a>
            </div>
          </div>
          <figure className="sq-hero-figure project-case-figure is-phones">
            <div className="project-case-phones glass-surface">
              <img src={`${base}/images/portfolio/flousy-activity.webp`} alt={c.altActivity} loading="eager" />
              <img src={`${base}/images/portfolio/flousy-ai.webp`} alt={c.altAi} loading="eager" />
            </div>
          </figure>
        </header>
        <dl className="sq-project-meta">
          <div><dt>{c.roleLabel}</dt><dd>{c.role}</dd></div>
          <div><dt>{c.periodLabel}</dt><dd>{c.period}</dd></div>
          <div><dt>{c.toolsLabel}</dt><dd><bdi>Flutter · Dart · Firebase · Gemini · Cloud Functions</bdi></dd></div>
        </dl>
        <nav className="section-rail sq-section-rail" aria-label={c.navLabel}>
          {sectionIds.map((id, index) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} className={activeSection === id ? "is-active" : undefined}><span>{c.nav[index]}</span><i aria-hidden /></a>)}
        </nav>
        <nav ref={navRef} className="sq-section-nav sq-section-nav-compact" aria-label={c.navLabel}>
          {sectionIds.map((id, index) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{c.nav[index]}</a>)}
        </nav>

        <section id="fl-overview" className="squash-case-section sq-overview" aria-labelledby="fl-overview-title">
          <div className="sq-overview-copy">
            <h2 id="fl-overview-title">{c.overviewTitle}</h2>
            <p>{c.overviewBody}</p>
            <h3>{c.contributionTitle}</h3>
            <p>{c.contribution}</p>
          </div>
          <aside className="sq-research-context" aria-labelledby="fl-context-title">
            <h3 id="fl-context-title">{c.contextTitle}</h3>
            <dl>{c.usage.map(([label, value]) => <div key={label}><dt>{label}</dt><dd><bdi>{value}</bdi></dd></div>)}</dl>
            <p>{c.context}</p>
          </aside>
        </section>

        <section id="fl-preview" className="squash-case-section" aria-labelledby="fl-preview-title">
          <header className="sq-section-heading"><h2 id="fl-preview-title">{c.previewTitle}</h2><p>{c.previewIntro}</p></header>
          <div className="fl-screens">
            <figure className="sq-demo-figure glass-surface"><img src={`${base}/images/portfolio/flousy-activity.webp`} alt={c.altActivity} loading="lazy" /><figcaption>{c.captions[0]}</figcaption></figure>
            <figure className="sq-demo-figure glass-surface"><img src={`${base}/images/portfolio/flousy-ai.webp`} alt={c.altAi} loading="lazy" /><figcaption>{c.captions[1]}</figcaption></figure>
          </div>
        </section>

        <section id="fl-system" className="squash-case-section" aria-labelledby="fl-system-title">
          <header className="sq-section-heading"><h2 id="fl-system-title">{c.systemTitle}</h2><p>{c.systemIntro}</p></header>
          <Tabs value={stage} onValueChange={setStage} dir={dir} className="sq-pipeline">
            <TabsList className="sq-stage-list" aria-label={c.stageNav}>
              {c.stages.map((item, index) => <TabsTrigger key={item.label} value={String(index)} className="sq-stage-tab" aria-label={item.label}><span className="sq-stage-number" aria-hidden>{String(index + 1).padStart(2, "0")}</span><span className="sq-stage-label" aria-hidden>{item.label}</span><span className="sq-stage-short-label" aria-hidden>{item.short}</span></TabsTrigger>)}
            </TabsList>
            {c.stages.map((item, index) => {
              const Icon = stageIcons[index];
              return <TabsContent key={item.label} value={String(index)} className="sq-stage-panel">
                <div className="sq-stage-description"><Icon size={30} strokeWidth={1.5} aria-hidden /><div><h3>{item.title}</h3><p>{item.body}</p></div></div>
                <dl className="sq-stage-flow"><div><dt>{c.input}</dt><dd>{item.input}</dd></div><ArrowRight size={20} aria-hidden /><div><dt>{c.output}</dt><dd>{item.output}</dd></div></dl>
              </TabsContent>;
            })}
          </Tabs>
          <div className="sq-abstention"><Info size={26} strokeWidth={1.5} aria-hidden /><div><h3>{c.turnTitle}</h3><p>{c.turnBody}</p></div></div>
        </section>

        <section id="fl-results" className="squash-case-section" aria-labelledby="fl-results-title">
          <header className="sq-section-heading"><h2 id="fl-results-title">{c.resultsTitle}</h2><p>{c.resultsIntro}</p></header>
          <div className="sq-evaluation-grid">
            <div className="sq-result-panel">
              <h3>{c.useTitle}</h3><p className="sq-result-subtitle">{c.useSubtitle}</p>
              <table className="sq-table"><caption className="sr-only">{c.useTitle}: {c.useSubtitle}</caption><thead><tr><th scope="col">{c.measure}</th><th scope="col">{c.value}</th></tr></thead><tbody>{c.useRows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td><bdi>{value}</bdi></td></tr>)}</tbody></table>
              <p className="sq-table-note">{c.useNote}</p>
            </div>
            <div className="sq-result-panel">
              <h3>{c.checksTitle}</h3><p className="sq-result-subtitle">{c.checksSubtitle}</p>
              <table className="sq-table"><caption className="sr-only">{c.checksTitle}: {c.checksSubtitle}</caption><thead><tr><th scope="col">{c.measure}</th><th scope="col">{c.value}</th></tr></thead><tbody>{c.checkRows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td><bdi>{value}</bdi></td></tr>)}</tbody></table>
              <p className="sq-table-note">{c.checksNote}</p>
            </div>
          </div>
          <div className="sq-measurement-boundary"><Info size={22} aria-hidden /><div><h3>{c.boundaryTitle}</h3><p>{c.boundaryBody}</p></div></div>
        </section>

        <section id="fl-limitations" className="squash-case-section" aria-labelledby="fl-limitations-title">
          <header className="sq-section-heading"><h2 id="fl-limitations-title">{c.limitationsTitle}</h2></header>
          <ul className="sq-limitations-list">{c.limitations.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ul>
        </section>

        <section id="fl-links" className="squash-case-section sq-resources" aria-labelledby="fl-links-title">
          <header className="sq-section-heading"><h2 id="fl-links-title">{c.linksTitle}</h2><p>{c.linksBody}</p></header>
          <div className="sq-resource-links">
            <a href={FLOUSY_PLAY_STORE_URL} target="_blank" rel="noreferrer"><Smartphone size={25} strokeWidth={1.5} aria-hidden /><span><strong>{c.play}</strong><small>{c.playMeta}</small></span><ArrowUpRight size={20} aria-hidden /></a>
            <a href={FLOUSY_SITE_URL} target="_blank" rel="noreferrer"><Globe2 size={25} strokeWidth={1.5} aria-hidden /><span><strong>{c.site}</strong><small>{c.siteMeta}</small></span><ArrowUpRight size={20} aria-hidden /></a>
          </div>
        </section>
        <SkillsUsed itemSlug="flousy" />
      </div>
    </main>
    <Footer />
  </div>;
}
