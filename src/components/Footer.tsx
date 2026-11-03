import PortfolioThemeToggle from "@/components/PortfolioThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { NavLink } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { getPortfolioNavigation } from "@/data/portfolioNavigation";
import PortfolioBrand from "@/components/PortfolioBrand";

export default function Footer() {
  const { t, lang } = useLanguage();
  const { audience } = useAudience();
  const navLinks = getPortfolioNavigation(t, lang, audience);
  return <footer className="portfolio-footer portfolio-container">
    <div className="portfolio-nav-shell">
      <PortfolioBrand />
      <nav className="portfolio-footer-links" aria-label={lang === "ar" ? "قائمة التذييل" : "Footer"}>
        {navLinks.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `portfolio-nav-link${isActive ? " is-active" : ""}`}>{link.name}</NavLink>)}
      </nav>
      <div className="portfolio-nav-tools"><LanguageToggle /><PortfolioThemeToggle /></div>
    </div>
    <div className="portfolio-footer-bottom"><p>{t("footer.rights", { year: new Date().getFullYear() })}</p><button type="button" className="portfolio-text-link" onClick={() => window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})}>{lang === "ar" ? "ارجع لفوق" : "Back to top"}<ArrowUp size={16} aria-hidden /></button></div>
  </footer>;
}
