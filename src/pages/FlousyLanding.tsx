import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BellRing, CalendarClock, Check, ChevronDown, Languages, LineChart, Mic, Moon, Sun, Target, Wallet } from "lucide-react";
import { FLOUSY_PLAY_STORE_URL } from "@/data/projectLinks";
import { landingCopy } from "@/data/flousyLanding";
import FlousyBackground from "@/components/FlousyBackground";
import FlousyIntro from "@/components/FlousyIntro";
import { trackPublicFlousyEvent } from "@/lib/flousyAnalytics";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/flousy-landing.css";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const img = (name: string) => `${base}/images/flousy/${name}`;
const WEB_APP_URL = "https://flousy.mahmoud-yassin.com";

const icons = { target: Target, calendar: CalendarClock, wallet: Wallet, bell: BellRing, mic: Mic, languages: Languages, moon: Moon, chart: LineChart } as const;

/** Public landing page for the Flousy app. Uses Flousy's own "Calm Ledger" look, not the portfolio's. */
export default function FlousyLanding() {
  const { lang, toggleLang } = useLanguage();
  const c = landingCopy[lang];
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));

  useEffect(() => { void trackPublicFlousyEvent("store_visit"); }, []);

  useEffect(() => {
    if (document.getElementById("flousy-poppins")) return;
    const link = document.createElement("link");
    link.id = "flousy-poppins";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const previous = document.title;
    // The language provider sets the portfolio title in its own effect, which runs after this one.
    const timer = window.setTimeout(() => {
      document.title = lang === "ar" ? "فلوسي — اعرف تصرف كام بأمان" : "Flousy — Know what you can safely spend";
    }, 0);
    return () => { window.clearTimeout(timer); document.title = previous; };
  }, [lang]);

  const setTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* storage can be blocked */ }
  };

  const install = () => { void trackPublicFlousyEvent("install"); };
  const playButton = (extra = "") => (
    <a className={`fl-btn fl-btn-primary ${extra}`} href={FLOUSY_PLAY_STORE_URL} target="_blank" rel="noreferrer" onClick={install}>{c.play}<ArrowRight size={17} aria-hidden /></a>
  );

  return (
    <div className="fl-landing" dir={lang === "ar" ? "rtl" : "ltr"}>
      <FlousyBackground />
      <FlousyIntro arabic={lang === "ar"} />
      <a className="fl-skip" href="#main">{lang === "ar" ? "تخطى للمحتوى" : "Skip to content"}</a>
      <header className="fl-header">
        <div className="fl-container fl-header-row">
          <a className="fl-brand" href="#top" aria-label={c.brand}><img src={img("logo.png")} alt="" width="34" height="34" /><span>{c.brand}</span></a>
          <nav className="fl-nav" aria-label={lang === "ar" ? "القائمة" : "Primary"}>
            <a href="#features">{c.nav.features}</a><a href="#how">{c.nav.how}</a><a href="#privacy">{c.nav.privacy}</a><a href="#faq">{c.nav.faq}</a>
          </nav>
          <div className="fl-header-tools">
            <button type="button" className="fl-chip" onClick={toggleLang} aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربية"}>{c.language}</button>
            <button type="button" className="fl-icon-btn" onClick={setTheme} aria-label={c.theme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <a className="fl-btn fl-btn-primary fl-btn-small" href={FLOUSY_PLAY_STORE_URL} target="_blank" rel="noreferrer" onClick={install}>{c.playShort}</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="fl-hero">
          <div className="fl-container fl-hero-grid">
            <div className="fl-hero-copy">
              <p className="fl-eyebrow">{c.eyebrow}</p>
              <h1>{c.headline} <span>{c.headlineAccent}</span></h1>
              <p className="fl-sub">{c.sub}</p>
              <div className="fl-actions">
                {playButton()}
                <a className="fl-btn fl-btn-ghost" href="#how">{c.secondary}</a>
              </div>
              <ul className="fl-notes">{c.heroNotes.map((note) => <li key={note}><Check size={15} aria-hidden />{note}</li>)}</ul>
            </div>
            <div className="fl-hero-visual" aria-hidden={false}>
              <div className="fl-phone fl-phone-back"><img src={img("assistant.webp")} alt={c.showcase[3].alt} width="420" height="880" loading="eager" /></div>
              <div className="fl-phone fl-phone-front"><img src={img("activity.webp")} alt={c.showcase[0].alt} width="420" height="880" loading="eager" /></div>
            </div>
          </div>
        </section>

        <section className="fl-asks">
          <div className="fl-container">
            <h2>{c.askTitle}</h2>
            <div className="fl-ask-grid">
              {c.asks.map((ask) => <article key={ask.q}><h3>{ask.q}</h3><p>{ask.a}</p></article>)}
            </div>
          </div>
        </section>

        <section id="features" className="fl-showcase">
          {c.showcase.map((item, index) => (
            <article key={item.id} className={`fl-feature${index % 2 ? " is-flip" : ""}`}>
              <div className="fl-container fl-feature-grid">
                <div className="fl-feature-copy">
                  <p className="fl-eyebrow">{item.tag}</p>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  <ul>{item.points.map((point) => <li key={point}><Check size={16} aria-hidden />{point}</li>)}</ul>
                </div>
                <div className={`fl-feature-visual fl-visual-${item.kind}`}>
                  <img src={img(item.image)} alt={item.alt} loading="lazy" decoding="async" />
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="fl-grid-section">
          <div className="fl-container">
            <header className="fl-section-head"><h2>{c.gridTitle}</h2><p>{c.gridIntro}</p></header>
            <div className="fl-feature-cards">
              {c.grid.map((item) => {
                const Icon = icons[item.icon as keyof typeof icons];
                return <article key={item.title}><span className="fl-icon"><Icon size={22} strokeWidth={1.6} aria-hidden /></span><h3>{item.title}</h3><p>{item.body}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="how" className="fl-how">
          <div className="fl-container">
            <header className="fl-section-head"><h2>{c.howTitle}</h2><p>{c.howIntro}</p></header>
            <ol className="fl-steps">
              {c.steps.map((step, index) => <li key={step.title}><span className="fl-step-number">{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}
            </ol>
          </div>
        </section>

        <section id="privacy" className="fl-privacy">
          <div className="fl-container fl-privacy-grid">
            <header className="fl-section-head"><h2>{c.privacyTitle}</h2><p>{c.privacyIntro}</p>
              <div className="fl-link-list">
                <Link to="/flousy/privacy-policy">{c.privacyLinks.policy}</Link>
                <Link to="/flousy/terms-and-conditions">{c.privacyLinks.terms}</Link>
                <Link to="/flousy/delete-account">{c.privacyLinks.deleteAccount}</Link>
                <Link to="/flousy/delete-data">{c.privacyLinks.deleteData}</Link>
              </div>
            </header>
            <div className="fl-privacy-cards">
              {c.privacy.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
            </div>
          </div>
        </section>

        <section id="faq" className="fl-faq">
          <div className="fl-container fl-faq-wrap">
            <h2>{c.faqTitle}</h2>
            {c.faq.map((item) => (
              <details key={item.q}><summary>{item.q}<ChevronDown size={18} aria-hidden /></summary><p>{item.a}</p></details>
            ))}
          </div>
        </section>

        <section className="fl-cta">
          <div className="fl-container fl-cta-box">
            <img src={img("logo.png")} alt="" width="56" height="56" />
            <h2>{c.ctaTitle}</h2>
            <p>{c.ctaBody}</p>
            <div className="fl-actions fl-actions-center">
              {playButton("fl-btn-on-dark")}
              <a className="fl-btn fl-btn-outline-light" href={WEB_APP_URL} target="_blank" rel="noreferrer">{c.openWeb}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="fl-footer">
        <div className="fl-container fl-footer-row">
          <span className="fl-brand"><img src={img("logo.png")} alt="" width="26" height="26" /><span>{c.brand}</span></span>
          <p>{c.footer.made} © {new Date().getFullYear()} {c.footer.rights}</p>
          <nav aria-label="Legal">
            <Link to="/flousy/privacy-policy">{c.privacyLinks.policy}</Link>
            <Link to="/flousy/terms-and-conditions">{c.privacyLinks.terms}</Link>
            <Link to="/flousy/delete-account">{c.privacyLinks.deleteAccount}</Link>
            <Link to="/contact">{c.footer.contact}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
