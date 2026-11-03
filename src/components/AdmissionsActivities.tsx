import { useState } from "react";
import { Code2, FlaskConical, HeartHandshake, CircleDot } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { activityGroups } from "@/data/admissions";
import { activityGroupsAr } from "@/data/admissionsAr";

const icons = [Code2, FlaskConical, HeartHandshake, CircleDot];

export default function AdmissionsActivities() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const groups = arabic ? activityGroupsAr : activityGroups;
  const [selected, setSelected] = useState(0);
  const group = groups[selected];
  return <section id="activities" className="portfolio-section portfolio-container">
    <header className="section-heading"><h2>{arabic ? "أكتر من كود." : "More than the code."}</h2><p>{arabic ? "بناء وبحث وتدريس واسكواش. اختار مجال وشوف الأنشطة." : "Building, researching, teaching and squash. Pick a chapter to see what's inside."}</p></header>
    <div className="activity-board">
      <div className="activity-tabs" role="tablist" aria-label={arabic ? "مجالات الأنشطة" : "Activity chapters"}>
        {groups.map((item, index) => {
          const Icon = icons[index] ?? CircleDot;
          return <button key={item.id} type="button" role="tab" id={`activity-tab-${item.id}`} aria-selected={index === selected} aria-controls="activity-panel" className={`activity-tab glass-surface${index === selected ? " is-selected" : ""}`} onClick={() => setSelected(index)}>
            <span className="activity-tab-icon"><Icon size={22} strokeWidth={1.6} aria-hidden /></span>
            <span className="activity-tab-copy"><strong>{item.title}</strong><small><bdi>{item.items.length}</bdi> {arabic ? "أنشطة" : "activities"}</small></span>
          </button>;
        })}
      </div>
      <div id="activity-panel" role="tabpanel" aria-labelledby={`activity-tab-${group.id}`} key={group.id} className="activity-panel glass-surface">
        <h3>{group.title}</h3>
        <p className="activity-panel-blurb">{group.blurb}</p>
        <ul>{group.items.map((item) => <li key={item.name}><div><h4>{item.name}</h4><span>{item.role}</span></div><p>{item.detail}</p></li>)}</ul>
      </div>
    </div>
  </section>;
}
