import { ArrowRight, Briefcase, Code2, Globe2, HeartHandshake, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { itemHref, skillsForItem, type WorkItem } from "@/data/workItems";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const iconFor = (item: WorkItem) => item.kind === "client" ? Globe2 : item.kind === "activity" ? (item.category === "Sport" ? Trophy : item.category === "Build" ? Briefcase : HeartHandshake) : Code2;

/** A whole-card link with an arrow on the right. Clicking anywhere opens the item's full page. */
export default function WorkCard({ item, variant = "tile" }: { item: WorkItem; variant?: "tile" | "row" }) {
  const Icon = iconFor(item);
  const skills = skillsForItem(item).slice(0, 4);
  const src = item.image ? `${base}${item.image}` : undefined;
  return (
    <Link to={itemHref(item)} className={`work-card glass-surface work-card-${variant}`}>
      {variant === "tile" && (
        <div className="work-card-media">
          {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <span className="work-card-icon" aria-hidden><Icon size={40} strokeWidth={1.2} /></span>}
        </div>
      )}
      <div className="work-card-body">
        <span className="work-card-meta">{item.category} · {item.period}</span>
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
        {skills.length > 0 && <ul className="work-card-skills" aria-label="Skills">{skills.map((skill) => <li key={skill.slug}>{skill.name}</li>)}</ul>}
      </div>
      <span className="work-card-arrow" aria-hidden><ArrowRight size={18} /></span>
    </Link>
  );
}
