import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="language-toggle" role="group" aria-label={t("nav.language")}>
      <button
        type="button"
        className={lang === "en" ? "is-active" : undefined}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === "ar" ? "is-active" : undefined}
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        lang="ar"
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageToggle;
