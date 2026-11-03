import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, ScanLine, Route, Layers3, Activity, ShieldCheck, FileText, Github, ChevronDown, Info } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
import { caseStudiesAr } from "@/data/caseStudiesAr";
import { getCaseStudy } from "@/data/caseStudies";
import { SQUASHVAR_MANUSCRIPT_URL } from "@/data/projectLinks";
import { squashCaseCopy, squashDetectorResults, squashImpactResults, squashSurfaceResults } from "@/data/squashvarCaseStudy";
import "@/styles/squashvar.css";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const sectionIds = ["sq-overview", "sq-system", "sq-evaluation", "sq-limitations", "sq-resources"];
const stageIcons = [ScanLine, Route, Layers3, Activity, ShieldCheck];
const sourceUrl = "https://github.com/mahmoud-yassin10/SquashVAR";
const figuresUrl = `${sourceUrl}/tree/main/figs`;

export default function SquashVARCaseStudy() {
  const { lang, dir } = useLanguage();
  const c = squashCaseCopy[lang];
  const study = lang === "ar" ? caseStudiesAr.find((item) => item.slug === "squashvar")! : getCaseStudy("squashvar")!;
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
            <h1>SquashVAR</h1>
            <p className="sq-lead">{c.lead}</p>
            <p className="sq-publication-status"><FileText size={16} aria-hidden />{c.status}</p>
            <div className="sq-hero-actions">
              <a href={SQUASHVAR_MANUSCRIPT_URL} target="_blank" rel="noreferrer" className="portfolio-button">{c.paper}<ArrowUpRight size={16} aria-hidden /></a>
              <a href={sourceUrl} target="_blank" rel="noreferrer" className="portfolio-text-link"><Github size={17} aria-hidden />{c.code}</a>
            </div>
          </div>
          <figure className="sq-hero-figure">
            <img src={`${base}/images/portfolio/squashvar-court.webp`} width="1440" height="810" alt={c.imageAlt} decoding="async" />
            <figcaption>{c.imageCaption}</figcaption>
          </figure>
        </header>
        <dl className="sq-project-meta">
          <div><dt>{c.roleLabel}</dt><dd>{c.role}</dd></div>
          <div><dt>{c.toolsLabel}</dt><dd><bdi>Python · YOLOv8 · BoT-SORT · OpenCV</bdi></dd></div>
        </dl>
        <nav ref={navRef} className="sq-section-nav" aria-label={c.navLabel}>
          {sectionIds.map((id,index) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{c.nav[index]}</a>)}
        </nav>

        <section id="sq-overview" className="squash-case-section sq-overview" aria-labelledby="sq-overview-title">
          <div className="sq-overview-copy">
            <h2 id="sq-overview-title">{c.overviewTitle}</h2>
            <p>{c.overviewBody}</p>
            <h3>{c.contributionTitle}</h3>
            <p>{study.role}</p>
          </div>
          <aside className="sq-research-context" aria-labelledby="sq-context-title">
            <h3 id="sq-context-title">{c.contextTitle}</h3>
            <dl><div><dt>{c.training}</dt><dd>{c.trainingValue}</dd></div><div><dt>{c.benchmark}</dt><dd>{c.benchmarkValue}</dd></div></dl>
            <p>{c.context}</p>
          </aside>
        </section>

        <section id="sq-system" className="squash-case-section" aria-labelledby="sq-system-title">
          <header className="sq-section-heading"><h2 id="sq-system-title">{c.systemTitle}</h2><p>{c.systemIntro}</p></header>
          <Tabs value={stage} onValueChange={setStage} dir={dir} className="sq-pipeline">
            <TabsList className="sq-stage-list" aria-label={c.stageNav}>
              {c.stages.map((label,index) => <TabsTrigger key={index} value={String(index)} className="sq-stage-tab" aria-label={label}><span className="sq-stage-number" aria-hidden>{String(index + 1).padStart(2,"0")}</span><span className="sq-stage-label" aria-hidden>{label}</span><span className="sq-stage-short-label" aria-hidden>{c.shortStages[index]}</span></TabsTrigger>)}
            </TabsList>
            {study.approach.map((step,index) => {
              const Icon = stageIcons[index];
              return <TabsContent key={step.title} value={String(index)} className="sq-stage-panel">
                <div className="sq-stage-description"><Icon size={30} strokeWidth={1.5} aria-hidden /><div><h3>{step.title}</h3><p>{step.body}</p></div></div>
                <dl className="sq-stage-flow"><div><dt>{c.input}</dt><dd>{c.stageInputs[index]}</dd></div><ArrowRight size={20} aria-hidden /><div><dt>{c.output}</dt><dd><bdi>{c.stageOutputs[index]}</bdi></dd></div></dl>
              </TabsContent>;
            })}
          </Tabs>
          <div className="sq-abstention"><ShieldCheck size={26} strokeWidth={1.5} aria-hidden /><div><h3>{c.abstentionTitle}</h3><p>{c.abstentionBody}</p></div></div>
        </section>

        <section id="sq-evaluation" className="squash-case-section" aria-labelledby="sq-evaluation-title">
          <header className="sq-section-heading"><h2 id="sq-evaluation-title">{c.evaluationTitle}</h2><p>{c.evaluationIntro}</p></header>
          <div className="sq-evaluation-grid">
            <div className="sq-result-panel">
              <h3>{c.detectionTitle}</h3><p className="sq-result-subtitle">{c.detectionSubtitle}</p>
              <table className="sq-table"><caption className="sr-only">{c.detectionTitle}: {c.detectionSubtitle}</caption><thead><tr><th scope="col">{c.resolution}</th><th scope="col">{c.precision}</th><th scope="col"><bdi>{c.map}</bdi></th></tr></thead><tbody>{squashDetectorResults.map((row) => <tr key={row.input}><th scope="row"><bdi>{row.input}</bdi></th><td><bdi>{row.precision}</bdi></td><td><bdi>{row.map50}</bdi></td></tr>)}</tbody></table>
              <p className="sq-table-note">{c.detectionCaption}</p>
            </div>
            <div className="sq-result-panel">
              <h3>{c.impactTitle}</h3><p className="sq-result-subtitle">{c.impactSubtitle}</p>
              <table className="sq-table"><caption className="sr-only">{c.impactTitle}: {c.impactSubtitle}</caption><thead><tr><th scope="col">{c.matching}</th><th scope="col">{c.f1}</th></tr></thead><tbody>{squashImpactResults.map((row) => <tr key={row.en}><th scope="row">{row[lang]}</th><td><bdi>{row.f1}</bdi></td></tr>)}</tbody></table>
              <p className="sq-table-note">{c.impactCaption}</p>
            </div>
          </div>
          <details className="sq-surface-details"><summary>{c.surfaceSummary}<ChevronDown size={18} aria-hidden /></summary><div><table className="sq-table"><caption className="sr-only">{c.surfaceSummary}</caption><thead><tr><th scope="col">{c.surface}</th><th scope="col">{c.f1}</th></tr></thead><tbody>{squashSurfaceResults.map((row) => <tr key={row.en}><th scope="row">{row[lang]}</th><td><bdi>{row.f1}</bdi></td></tr>)}</tbody></table><p className="sq-table-note">{c.surfaceCaption}</p></div></details>
          <div className="sq-measurement-boundary"><Info size={22} aria-hidden /><div><h3>{c.boundaryTitle}</h3><p>{c.boundaryBody}</p></div></div>
        </section>

        <section id="sq-limitations" className="squash-case-section" aria-labelledby="sq-limitations-title">
          <header className="sq-section-heading"><h2 id="sq-limitations-title">{c.limitationsTitle}</h2></header>
          <ul className="sq-limitations-list">{c.limitations.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ul>
          <p className="sq-review-note">{c.reviewNote}</p>
        </section>

        <section id="sq-resources" className="squash-case-section sq-resources" aria-labelledby="sq-resources-title">
          <header className="sq-section-heading"><h2 id="sq-resources-title">{c.resourcesTitle}</h2><p>{c.resourcesBody}</p></header>
          <div className="sq-resource-links">
            <a href={SQUASHVAR_MANUSCRIPT_URL} target="_blank" rel="noreferrer"><FileText size={25} strokeWidth={1.5} aria-hidden /><span><strong>{c.paper}</strong><small>{c.paperMeta}</small></span><ArrowUpRight size={20} aria-hidden /></a>
            <a href={sourceUrl} target="_blank" rel="noreferrer"><Github size={25} strokeWidth={1.5} aria-hidden /><span><strong>{c.code}</strong><small>{c.codeMeta}</small></span><ArrowUpRight size={20} aria-hidden /></a>
          </div>
          <a className="portfolio-text-link sq-figures-link" href={figuresUrl} target="_blank" rel="noreferrer">{c.figures}<ArrowUpRight size={17} aria-hidden /></a>
        </section>
      </div>
    </main>
    <Footer />
  </div>;
}
