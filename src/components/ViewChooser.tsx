import { useEffect, useRef } from "react";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Handshake, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAudience, type Audience } from "@/context/AudienceContext";
import { isProductRoute } from "@/lib/themeScope";
import { useLanguage } from "@/i18n/LanguageContext";

const options: Array<{ id: Audience; icon: typeof BriefcaseBusiness; en: { title: string; hint: string }; ar: { title: string; hint: string } }> = [
  { id: "recruiter", icon: BriefcaseBusiness, en: { title: "I'm hiring", hint: "Engineering projects, the numbers behind them, and the skills I use." }, ar: { title: "بوظّف", hint: "مشاريع هندسية والأرقام ورا كل واحد والمهارات اللي بستخدمها." } },
  { id: "admissions", icon: GraduationCap, en: { title: "I'm reviewing an application", hint: "My story, activities, honors and the research behind them." }, ar: { title: "براجع تقديم", hint: "قصتي وأنشطتي وجوايزي والبحث ورا كل ده." } },
  { id: "client", icon: Handshake, en: { title: "I have a project in mind", hint: "Sites and platforms I've built for clients, and how to start." }, ar: { title: "عندي مشروع", hint: "مواقع ومنصات بنيتها لعملاء، وإزاي نبدأ." } }
];

/** First-visit chooser. It also opens from the "view" button in the nav. */
export default function ViewChooser() {
  const { audience, chooserOpen, closeChooser, setAudience } = useAudience();
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const arabic = lang === "ar";
  const firstRef = useRef<HTMLButtonElement>(null);
  const open = chooserOpen && !isProductRoute(pathname);

  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeChooser(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open, closeChooser]);

  if (!open) return null;
  return (
    <div className="view-chooser-backdrop" onClick={closeChooser}>
      <div className="view-chooser glass-surface" role="dialog" aria-modal="true" aria-labelledby="view-chooser-title" dir={arabic ? "rtl" : "ltr"} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="view-chooser-close" onClick={closeChooser} aria-label={arabic ? "إغلاق" : "Close"}><X size={18} /></button>
        <p className="view-chooser-kicker">{arabic ? "أهلاً" : "Welcome"}</p>
        <h2 id="view-chooser-title">{arabic ? "إيه اللي جابك هنا؟" : "What brings you here?"}</h2>
        <p className="view-chooser-sub">{arabic ? "اختار وهخصص الصفحة. تقدر تغيّر في أي وقت." : "Pick one and I'll tailor the page. You can switch any time."}</p>
        <div className="view-chooser-options">
          {options.map((option, index) => {
            const Icon = option.icon;
            const copy = arabic ? option.ar : option.en;
            return (
              <button key={option.id} ref={index === 0 ? firstRef : undefined} type="button" className={`view-option${audience === option.id ? " is-current" : ""}`} onClick={() => { setAudience(option.id); closeChooser(); }}>
                <span className="view-option-icon"><Icon size={22} strokeWidth={1.6} aria-hidden /></span>
                <span className="view-option-copy"><strong>{copy.title}</strong><small>{copy.hint}</small></span>
                <span className="view-option-arrow" aria-hidden><ArrowRight size={18} /></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
