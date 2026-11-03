import { useLanguage } from "@/i18n/LanguageContext";
import { activityGroupsAr } from "@/data/admissionsAr";
import { activityGroups } from "@/data/admissions";

const AdmissionsActivities = () => {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const items = arabic ? activityGroupsAr : activityGroups;
  return (
  <section id="activities" className="py-20 relative bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <p className="audience-hero-eyebrow mb-3">{arabic ? "الأنشطة" : "Activities"}</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12 max-w-3xl">
          {arabic ? "بناء وبحث وتدريس واسكواش." : "Building, researching, teaching, and squash."}
        </h2>

        <div className="space-y-12">
          {items.map((group) => (
            <div key={group.id} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
              <div>
                <h3 className="text-xl font-bold text-primary">{group.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{group.blurb}</p>
              </div>
              <ul className="divide-y divide-border rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                {group.items.map((item) => (
                  <li key={item.name} className="p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <span className="text-sm text-accent font-semibold">{item.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default AdmissionsActivities;
