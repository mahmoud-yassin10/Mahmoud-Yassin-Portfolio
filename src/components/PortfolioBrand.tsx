import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export default function PortfolioBrand() {
  const { lang } = useLanguage();
  return (
    <Link to="/" className="portfolio-brand" aria-label={lang === "ar" ? "محمود ياسين، الرئيسية" : "Mahmoud Yassin, home"}>
      <img className="portfolio-sphere" src={`${base}/brand/sphere.webp`} alt="" width="40" height="40" aria-hidden />
      <span className="portfolio-brand-name">{lang === "ar" ? "محمود ياسين" : "Mahmoud Yassin"}</span>
    </Link>
  );
}
