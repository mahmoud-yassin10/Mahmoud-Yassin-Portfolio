import { admissionsProof } from "@/data/admissions";
import { admissionsProofAr } from "@/data/admissionsAr";
import CountUp from "@/components/CountUp";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AudiencePath() {
  const { lang } = useLanguage();
  const proof = lang === "ar" ? admissionsProofAr : admissionsProof;
  return (
    <section className="proof-band portfolio-container" aria-label={lang === "ar" ? "أدلة من الشغل والتقديم" : "Evidence from the work and application"}>
      <dl>{proof.map((item) => <div key={item.label}><dt><CountUp value={item.value} /></dt><dd>{item.label}</dd></div>)}</dl>
    </section>
  );
}
