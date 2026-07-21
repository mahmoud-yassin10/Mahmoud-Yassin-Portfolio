import { useAudience } from "@/context/AudienceContext";
import { Activity, ArrowRight, BriefcaseBusiness, GraduationCap, Handshake, Sparkles } from "lucide-react";

const icons = {
  recruiter: BriefcaseBusiness,
  admissions: GraduationCap,
  client: Handshake
};

const AudienceTransition = () => {
  const { isTransitioning, transitionTarget } = useAudience();
  const Icon = transitionTarget ? icons[transitionTarget.id] : Sparkles;

  return (
    <div
      className={`audience-transition ${isTransitioning ? "audience-transition-active" : ""}`}
      aria-hidden={!isTransitioning}
      aria-live="polite"
    >
      <div className="audience-transition-grid" aria-hidden />
      <div className="audience-transition-orbit audience-transition-orbit-one" aria-hidden />
      <div className="audience-transition-orbit audience-transition-orbit-two" aria-hidden />
      <div className="audience-transition-inner">
        <div className="audience-transition-mark"><Icon size={24} strokeWidth={1.6} /></div>
        <p className="audience-transition-kicker"><Activity size={13} /> Reconfiguring perspective</p>
        <h2>{transitionTarget ? transitionTarget.shortLabel : "Your view"}</h2>
        <div className="audience-transition-status">
          <span className="audience-transition-pulse" />
          <span>Loading the right work</span>
          <ArrowRight size={14} />
        </div>
        <div className="audience-transition-progress" aria-hidden><span /></div>
      </div>
    </div>
  );
};

export default AudienceTransition;
