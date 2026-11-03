import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PortfolioThemeToggle() {
  const { t } = useLanguage();
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", localStorage.getItem("theme") !== "light");
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return <button type="button" className="portfolio-icon-button" aria-label={t("nav.theme")} onClick={() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>;
}
