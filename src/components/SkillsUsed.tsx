import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getWorkItem, itemsForSkill, skillsForItem, workItems } from "@/data/workItems";
import { useLanguage } from "@/i18n/LanguageContext";

/** Skills list for any work page. Each skill opens a page of everything that uses it. */
export default function SkillsUsed({ itemSlug, caseStudy }: { itemSlug?: string; caseStudy?: string }) {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const item = itemSlug ? getWorkItem(itemSlug) : workItems.find((entry) => entry.caseStudy === caseStudy);
  if (!item) return null;
  const skills = skillsForItem(item);
  if (skills.length === 0) return null;
  return (
    <section id="skills-used" className="squash-case-section skills-used" aria-labelledby="skills-used-title">
      <header className="sq-section-heading">
        <h2 id="skills-used-title">{arabic ? "المهارات المستخدمة." : "Skills used."}</h2>
        <p>{arabic ? "اضغط على أي مهارة وشوف كل الشغل اللي استخدمها." : "Open any skill to see everything else I used it on."}</p>
      </header>
      <ul className="skill-chip-grid">
        {skills.map((skill) => {
          const count = itemsForSkill(skill.slug).length;
          return (
            <li key={skill.slug}>
              <Link to={`/skills/${skill.slug}`} className="skill-chip">
                <span><strong>{skill.name}</strong><small>{skill.group}</small></span>
                <em>{count} {arabic ? (count === 1 ? "عمل" : "أعمال") : count === 1 ? "work" : "works"}</em>
                <ArrowRight size={16} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/skills" className="portfolio-text-link skills-all-link">{arabic ? "كل المهارات" : "Explore all skills"}<ArrowRight size={16} aria-hidden /></Link>
    </section>
  );
}
