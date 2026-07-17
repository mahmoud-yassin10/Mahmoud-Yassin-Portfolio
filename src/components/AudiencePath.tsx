import { ArrowDownRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAudience } from "@/context/AudienceContext";

const AudiencePath = () => {
  const { profile } = useAudience();
  if (!profile) return null;

  const path = profile.id === "recruiter"
    ? ["Selected work", "Experience", "Technical range"]
    : profile.id === "admissions"
      ? ["About me", "Education", "Leadership & recognition"]
      : ["Services", "Selected work", "Start a conversation"];

  return (
    <section className="audience-path-section" aria-label={`${profile.shortLabel} portfolio route`}>
      <div className="container mx-auto px-4">
        <div className="audience-path">
          <div className="audience-path-intro">
            <p className="audience-hero-eyebrow">{profile.sectionLabel}</p>
            <h2>{profile.routeDescription}</h2>
            <div className="audience-path-route">
              {path.map((item, index) => (
                <span key={item} className="audience-path-route-item">
                  <CheckCircle2 size={15} aria-hidden /> {item}
                  {index < path.length - 1 ? <ArrowRight size={14} aria-hidden /> : null}
                </span>
              ))}
            </div>
          </div>
          <div className="audience-proof-grid">
            {profile.proofPoints.map((point) => (
              <div className="audience-proof" key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
          <Link className="audience-path-cue" to={profile.id === "client" ? "/services" : profile.id === "admissions" ? "/portfolio" : "/work"}>
            Follow this route <ArrowDownRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AudiencePath;
