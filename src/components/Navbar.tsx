import PortfolioThemeToggle from "@/components/PortfolioThemeToggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";
import LanguageToggle from "@/components/LanguageToggle";
import PortfolioBrand from "@/components/PortfolioBrand";
import { getPortfolioNavigation } from "@/data/portfolioNavigation";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { audience } = useAudience();
  const { t, lang } = useLanguage();
  const { pathname } = useLocation();
  const navLinks = getPortfolioNavigation(t, lang, audience);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsMobileMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", closeOnEscape); };
  }, [isMobileMenuOpen]);

  return <>
    {isMobileMenuOpen && <div className="portfolio-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)} aria-hidden />}
    <header className="portfolio-topbar">
      <div className="portfolio-nav-shell">
        <PortfolioBrand />
        <nav className="portfolio-desktop-links" aria-label={lang === "ar" ? "القائمة الرئيسية" : "Primary"}>
          {navLinks.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `portfolio-nav-link${isActive ? " is-active" : ""}`}>{link.name}</NavLink>)}
        </nav>
        <div className="portfolio-nav-tools">
          <LanguageToggle />
          <PortfolioThemeToggle />
          <button type="button" className="portfolio-icon-button portfolio-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-controls="portfolio-mobile-navigation" aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}>{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {isMobileMenuOpen && <nav id="portfolio-mobile-navigation" className="portfolio-mobile-links" aria-label={lang === "ar" ? "قائمة الموبايل" : "Mobile navigation"}>
        {navLinks.map((link) => <NavLink key={link.to} to={link.to} aria-current={pathname === link.to ? "page" : undefined} onClick={() => setIsMobileMenuOpen(false)} className="portfolio-nav-link">{link.name}</NavLink>)}
      </nav>}
    </header>
  </>;
}
