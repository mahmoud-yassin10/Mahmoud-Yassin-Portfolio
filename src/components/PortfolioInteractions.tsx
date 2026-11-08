import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { isProductRoute } from "@/lib/themeScope";

const sections = [
  { id: "hero", en: "Introduction", ar: "البداية" },
  { id: "stories", en: "Selected work", ar: "المشاريع" },
  { id: "work", en: "Work", ar: "الشغل" },
  { id: "services", en: "Services", ar: "الخدمات" },
  { id: "journey", en: "Timeline", ar: "الرحلة" },
  { id: "activities", en: "Activities", ar: "الأنشطة" },
  { id: "honors", en: "Honors", ar: "الجوائز" },
  { id: "education", en: "Education", ar: "التعليم" },
  { id: "skills", en: "Toolkit", ar: "الأدوات" },
  { id: "contact", en: "Contact", ar: "تواصل" }
];

export default function PortfolioInteractions() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const { audience } = useAudience();
  const [active, setActive] = useState("hero");
  const [present, setPresent] = useState(sections);
  const cursorRef = useRef<HTMLDivElement>(null);
  const product = isProductRoute(pathname);

  useEffect(() => {
    if (pathname !== "/") return;
    const timer = window.setTimeout(() => setPresent(sections.filter(({ id }) => document.getElementById(id))), 80);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    sections.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, [pathname, audience]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (product || !cursor) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reduced.matches) return;
      if (!document.documentElement.classList.contains("portfolio-custom-cursor")) document.documentElement.classList.add("portfolio-custom-cursor");
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        cursor.style.opacity = "1";
      });
    };
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      cursor.dataset.interactive = String(Boolean(target?.closest("a,button,summary,select")));
      const textField = Boolean(target?.closest("input,textarea,[contenteditable=true]"));
      cursor.dataset.text = String(textField);
    };
    const leave = () => { cursor.style.opacity = "0"; document.documentElement.classList.remove("portfolio-custom-cursor"); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") leave(); };
    const preferencesChanged = () => { if (!finePointer.matches || reduced.matches) leave(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("keydown", keyboard);
    reduced.addEventListener("change", preferencesChanged);
    finePointer.addEventListener("change", preferencesChanged);
    return () => {
      cancelAnimationFrame(frame); leave();
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave); window.removeEventListener("blur", leave);
      window.removeEventListener("keydown", keyboard);
      reduced.removeEventListener("change", preferencesChanged); finePointer.removeEventListener("change", preferencesChanged);
    };
  }, [product]);

  if (product) return null;
  const jump = (id: string) => {
    setActive(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  };
  return <>
    <div className="portfolio-cursor" ref={cursorRef} aria-hidden><span className="cursor-ring" /><span className="cursor-core" /></div>
    {pathname === "/" && <>
      <nav className="section-rail" aria-label={lang === "ar" ? "أقسام الصفحة" : "Page sections"}>
        {present.map((section) => <a href={`#${section.id}`} key={section.id} aria-current={active === section.id ? "location" : undefined} className={active === section.id ? "is-active" : undefined}><span>{lang === "ar" ? section.ar : section.en}</span><i aria-hidden /></a>)}
      </nav>
      <div className="mobile-section-navigator"><label htmlFor="section-jump">{lang === "ar" ? "بتقرأ دلوقتي" : "Now reading"}</label><select id="section-jump" aria-label={lang === "ar" ? "انتقل لقسم" : "Jump to section"} value={active} onChange={(event) => jump(event.target.value)}>{present.map((section) => <option key={section.id} value={section.id}>{lang === "ar" ? section.ar : section.en}</option>)}</select></div>
    </>}
  </>;
}
