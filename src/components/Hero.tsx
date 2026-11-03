import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export default function Hero() {
  const { lang, t } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="hero" className="ai-hero">
      <div className="portfolio-container ai-hero-grid">
        <div className="ai-hero-copy">
          <p className="hero-introduction">{arabic ? "مهندس برمجيات وباحث في الذكاء الاصطناعي" : "Software engineer & AI researcher"}</p>
          <h1>{arabic ? <>برمجيات وذكاء.<br /><span>بهدف واضح.</span></> : <>Software & AI.<br /><span>Built with purpose.</span></>}</h1>
          <p className="hero-description">{arabic ? "أنا محمود ياسين. ببني أنظمة رؤية حاسوبية، وأدوات مالية، ومنصات تعليمية." : "I’m Mahmoud Yassin. I build computer-vision systems, financial tools, and learning platforms."}</p>
          <div className="hero-actions">
            <a className="portfolio-button" href="#stories">{arabic ? "استكشف الشغل" : "Explore my work"}<ArrowDown size={17} aria-hidden /></a>
            <Link className="portfolio-text-link" to="/research">{arabic ? "شوف البحث" : "Explore the research"}<ArrowUpRight size={18} aria-hidden /></Link>
          </div>
        </div>
        <div className="ai-hero-art">
          <img className="hero-portrait" src={`${base}/ME-NTA.webp`} alt={t("hero.photoAlt")} width="1200" height="800" loading="eager" decoding="async" />
          <div className="hero-profile">
            <div><strong>{arabic ? "محمود ياسين" : "Mahmoud Yassin"}</strong><span>{arabic ? "فضول. بحث. بناء." : "Curiosity. Research. Building."}</span></div>
            <div className="hero-socials">
              <a href="https://github.com/mahmoud-yassin10" target="_blank" rel="noreferrer" aria-label={t("hero.github")}><Github size={19} /></a>
              <a href="https://linkedin.com/in/mahmoud--yassin" target="_blank" rel="noreferrer" aria-label={t("hero.linkedin")}><Linkedin size={19} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
