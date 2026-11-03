import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PortfolioBrand() {
  const { lang } = useLanguage();
  return (
    <Link to="/" className="portfolio-brand" aria-label={lang === "ar" ? "محمود ياسين، الرئيسية" : "Mahmoud Yassin, home"}>
      <span className="portfolio-monogram" aria-hidden>MY</span>
      <span className="portfolio-brand-name">{lang === "ar" ? "محمود ياسين" : "Mahmoud Yassin"}</span>
    </Link>
  );
}
