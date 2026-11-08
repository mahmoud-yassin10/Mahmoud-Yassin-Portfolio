import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServiceInquiryWizard from "@/components/ServiceInquiryWizard";
import WorkCard from "@/components/WorkCard";
import { services, workCategoryLabels } from "@/data/serviceCatalog";
import { getSkill } from "@/data/skillCatalog";
import { itemsForCategory } from "@/data/workItems";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/squashvar.css";

/** Every service in detail, with related past work and a guided request form. */
export default function ServicesPage() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) { window.scrollTo(0, 0); return; }
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="squash-case-page relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="squash-case-main relative z-10">
        <div className="portfolio-container">
          <header className="skill-hero">
            <p className="sq-category">{arabic ? "الخدمات" : "Services"}</p>
            <h1>{arabic ? "إيه اللي أقدر أبنيه ليك." : "What I can build for you."}</h1>
            <p className="sq-lead">{arabic ? "كل خدمة تحت بالتفصيل، مع شغل سابق شبهها. لما تكون جاهز، ابدأ الطلب." : "Every service in detail, with past work like it. When you are ready, start a request and answer a few questions."}</p>
            <ul className="skill-pills service-jump">
              {services.map((service) => <li key={service.slug}><a href={`#${service.slug}`}>{service.title}</a></li>)}
            </ul>
          </header>

          {services.map((service) => {
            const related = Array.from(new Map(service.categories.flatMap((category) => itemsForCategory(category)).filter((item) => item.kind !== "activity").map((item) => [item.slug, item])).values()).slice(0, 3);
            return (
              <section key={service.slug} id={service.slug} className="squash-case-section service-block" aria-label={service.title}>
                <header className="sq-section-heading"><h2>{service.title}</h2><p>{service.who}</p></header>
                <p className="wk-prose">{service.summary}</p>
                <div className="service-columns">
                  <div className="glass-surface service-card">
                    <h3>{arabic ? "اللي هتاخده" : "What you get"}</h3>
                    <ul className="service-list">{service.includes.map((entry) => <li key={entry}><Check size={15} aria-hidden />{entry}</li>)}</ul>
                  </div>
                  <div className="glass-surface service-card">
                    <h3>{arabic ? "الأدوات" : "Built with"}</h3>
                    <ul className="skill-pills">
                      {service.skills.map((slug) => { const skill = getSkill(slug); return skill ? <li key={slug}><Link to={`/skills/${slug}`}>{skill.name}</Link></li> : null; })}
                    </ul>
                    <p className="q-help">{service.stack.join(" · ")}</p>
                    <Link to={`/services?service=${service.slug}#inquiry`} className="portfolio-button">{arabic ? "ابدأ الطلب" : "Start this request"}<ArrowRight size={16} aria-hidden /></Link>
                  </div>
                </div>
                {related.length > 0 && (
                  <div className="service-related">
                    <h3>{arabic ? "شغل شبه ده" : "Work like this"}</h3>
                    <div className="work-grid">{related.map((item) => <WorkCard key={item.slug} item={item} />)}</div>
                    <div className="service-related-links">
                      {service.categories.map((category) => <Link key={category} to={`/work?category=${category}`} className="portfolio-text-link">{arabic ? workCategoryLabels[category].ar : workCategoryLabels[category].en}<ArrowRight size={15} aria-hidden /></Link>)}
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          <section className="squash-case-section"><ServiceInquiryWizard /></section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
