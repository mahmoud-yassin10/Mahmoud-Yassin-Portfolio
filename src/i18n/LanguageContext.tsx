import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ar } from "./ar";
import { en } from "./en";

export type Lang = "en" | "ar";

const STORAGE_KEY = "mahmoud-portfolio-lang";
const dictionaries = { en, ar } as const;

type Dict = typeof en;

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(value: string, vars?: Record<string, string | number>) {
  if (!vars) return value;
  return Object.entries(vars).reduce((acc, [key, replacement]) => acc.split(`{{${key}}}`).join(String(replacement)), value);
}

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
  dict: Dict;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const applyDocumentLang = (lang: Lang) => {
  const html = document.documentElement;
  html.lang = lang === "ar" ? "ar" : "en";
  html.dir = lang === "ar" ? "rtl" : "ltr";
  html.classList.toggle("lang-ar", lang === "ar");
  document.title =
    lang === "ar"
      ? "محمود ياسين — مهندس برمجيات ومؤسس طالب"
      : "Mahmoud Yassin - Software Engineer & Student Founder";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ar" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    applyDocumentLang(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[lang] as Dict;
    const t = (path: string, vars?: Record<string, string | number>) => {
      const fromActive = getPath(dict, path);
      const fromEn = getPath(en, path);
      const raw = typeof fromActive === "string" ? fromActive : typeof fromEn === "string" ? fromEn : path;
      return interpolate(raw, vars);
    };
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang,
      t,
      dict
    };
  }, [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
