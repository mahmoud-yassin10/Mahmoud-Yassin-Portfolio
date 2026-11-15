import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/squashvar.css";

const NotFound = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const arabic = lang === "ar";

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const links = [
    { to: "/", en: "Home", ar: "الرئيسية" },
    { to: "/work", en: "Work", ar: "الشغل" },
    { to: "/skills", en: "Skills", ar: "المهارات" },
    { to: "/services", en: "Services", ar: "الخدمات" },
    { to: "/#contact", en: "Contact", ar: "تواصل" },
  ];

  return (
    <div className="squash-case-page relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="squash-case-main relative z-10">
        <div className="portfolio-container not-found">
          <img className="not-found-sphere" src="/brand/sphere.webp" alt="" width="220" height="220" />
          <p className="sq-category">{arabic ? "خطأ 404" : "Error 404"}</p>
          <h1>{arabic ? "الصفحة دي مش موجودة." : "This page is off the map."}</h1>
          <p className="sq-lead">
            {arabic ? "ممكن الرابط اتغير أو اتكتب غلط. جرّب واحدة من دول:" : "The link may have moved or been mistyped. Try one of these instead:"}
          </p>
          <code className="not-found-path glass-surface">{pathname}</code>
          <ul className="not-found-links">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="glass-surface">{arabic ? link.ar : link.en}<ArrowRight size={16} aria-hidden /></Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
