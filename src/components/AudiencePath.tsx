import { ArrowDownRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";

const AudiencePath = () => {
  const { profile } = useAudience();
  const { t, dict } = useLanguage();
  if (!profile) return null;

  const copy = dict.audience[profile.id];

  return (
    <section className="audience-path-section" aria-label={t("path.aria", { label: copy.shortLabel })}>
      <div className="container mx-auto px-4">
        <div className="audience-path">
          <div className="audience-path-intro">
            <p className="audience-hero-eyebrow">{copy.sectionLabel}</p>
            <h2>{copy.routeDescription}</h2>
            <div className="audience-path-route">
              {copy.path.map((item, index) => (
                <span key={item} className="audience-path-route-item">
                  <CheckCircle2 size={15} aria-hidden /> {item}
                  {index < copy.path.length - 1 ? <ArrowRight size={14} aria-hidden /> : null}
                </span>
              ))}
            </div>
          </div>
          <div className="audience-proof-grid">
            {copy.proof.map((point) => (
              <div className="audience-proof" key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
          <Link className="audience-path-cue" to={profile.id === "client" ? "/services" : profile.id === "admissions" ? "/portfolio" : "/work"}>
            {t("path.follow")} <ArrowDownRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AudiencePath;
