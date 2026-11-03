import { Code2, ScanLine, Users, Activity, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { activityGroups } from "@/data/admissions";
import { activityGroupsAr } from "@/data/admissionsAr";
const icons = [Code2, ScanLine, Users, Activity];

export default function AdmissionsActivities() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const groups = arabic ? activityGroupsAr : activityGroups;
  return <section id="activities" className="portfolio-section portfolio-container">
    <header className="section-heading"><h2>{arabic ? "أكتر من كود." : "More than the code."}</h2><p>{arabic ? "بناء وبحث وتدريس واسكواش. افتح أي مجال عشان تشوف التفاصيل." : "Building, researching, teaching, and squash. Open a chapter to explore the activities."}</p></header>
    <div className="activity-chapters">
      {groups.map((group,index) => {
        const Icon = icons[index];
        return <details key={group.id} className="activity-chapter" open={index === 0}>
          <summary><Icon size={25} strokeWidth={1.5} aria-hidden /><span><strong>{group.title}</strong><small>{group.blurb}</small></span><span className="activity-count"><bdi>{group.items.length}</bdi> {arabic ? "أنشطة" : "activities"}</span><Plus className="chapter-toggle" size={22} aria-hidden /></summary>
          <ul>{group.items.map((item) => <li key={item.name}><div><h3>{item.name}</h3><span>{item.role}</span></div><p>{item.detail}</p></li>)}</ul>
        </details>;
      })}
    </div>
  </section>;
}
