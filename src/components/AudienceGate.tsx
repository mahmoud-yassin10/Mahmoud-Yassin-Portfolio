import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Handshake, Sparkles } from "lucide-react";
import { audienceProfiles, useAudience, type Audience } from "@/context/AudienceContext";
import type { CSSProperties } from "react";
import { useLocation } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = {
  briefcase: BriefcaseBusiness,
  graduation: GraduationCap,
  handshake: Handshake
};

const hintKey = {
  recruiter: "gate.recruiterHint",
  admissions: "gate.admissionsHint",
  client: "gate.clientHint"
} as const;

const AudienceGate = () => {
  const { audience, setAudience } = useAudience();
  const { t } = useLanguage();
  const location = useLocation();
  const isOpen = !audience;
  if (location.pathname.startsWith("/flousy") || location.pathname.startsWith("/hub")) return null;

  const chooseAudience = (nextAudience: Audience) => {
    setAudience(nextAudience);
  };

  return (
    <div className={`audience-gate ${isOpen ? "audience-gate-open" : "audience-gate-closed"}`} aria-hidden={!isOpen}>
      <div className="audience-gate-noise" aria-hidden />
      <div className="audience-gate-inner">
        <div className="audience-gate-brand"><span>MY</span><span className="audience-gate-brand-line" /></div>
        <div className="audience-gate-lang">
          <LanguageToggle />
        </div>
        <div className="audience-gate-heading">
          <p className="audience-gate-kicker"><Sparkles size={14} aria-hidden /> {t("gate.kicker")}</p>
          <h1>{t("gate.title")}</h1>
          <p>{t("gate.subtitle")}</p>
        </div>
        <div className="audience-gate-options" role="list" aria-label={t("gate.optionsAria")}>
          {audienceProfiles.map((profile, index) => {
            const Icon = icons[profile.iconName];
            return (
              <button
                key={profile.id}
                className="audience-option"
                style={{ "--audience-delay": `${index * 90}ms` } as CSSProperties}
                onClick={() => chooseAudience(profile.id)}
                type="button"
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="audience-option-index">0{index + 1}</span>
                <span className="audience-option-icon"><Icon size={30} strokeWidth={1.4} aria-hidden /></span>
                <span className="audience-option-copy">
                  <strong>{t(`audience.${profile.id}.label`)}</strong>
                  <small>{t(hintKey[profile.id])}</small>
                </span>
                <ArrowUpRight className="audience-option-arrow" size={22} aria-hidden />
              </button>
            );
          })}
        </div>
        <p className="audience-gate-footnote">{t("gate.footnote")}</p>
      </div>
    </div>
  );
};

export default AudienceGate;
