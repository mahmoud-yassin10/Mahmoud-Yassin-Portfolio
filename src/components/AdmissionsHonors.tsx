import { useLanguage } from "@/i18n/LanguageContext";
import { honorsAr } from "@/data/admissionsAr";
import { honors } from "@/data/admissions";

const AdmissionsHonors = () => {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const items = arabic ? honorsAr : honors;
  return (
  <section id="honors" className="py-20 relative">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <p className="audience-hero-eyebrow mb-3">{arabic ? "الجوائز والتقدير" : "Honors"}</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12 max-w-3xl">{arabic ? "تقدير على طول الطريق." : "Recognition along the way."}</h2>

        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((honor) => (
            <li
              key={`${honor.org}-${honor.title}`}
              className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5"
            >
              <div>
                <h3 className="font-semibold text-foreground">{honor.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{honor.org}</p>
              </div>
              {honor.year ? (
                <span className="shrink-0 text-sm font-semibold text-primary">{honor.year}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
};

export default AdmissionsHonors;
