import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { SkillGroup } from "@/data/skillCatalog";
import { useAudience } from "@/context/AudienceContext";
import { itemsForSkill, usedSkillsFor } from "@/data/workItems";
import { useLanguage } from "@/i18n/LanguageContext";
import "@/styles/squashvar.css";

const groups: SkillGroup[] = ["Languages", "Frameworks", "Data and cloud", "AI and vision", "Engineering practice", "People and leadership"];

/** Every skill, grouped, with how many pieces of work use it. */
export default function SkillsPage() {
  const { lang } = useLanguage();
  const { audience } = useAudience();
  const includeActivities = audience === "admissions";
  const arabic = lang === "ar";
  const [query, setQuery] = useState("");
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const filtered = useMemo(() => usedSkillsFor(includeActivities).filter((skill) => skill.name.toLowerCase().includes(query.trim().toLowerCase())), [query, includeActivities]);

  return <div className="squash-case-page relative min-h-screen bg-background text-foreground">
    <AnimatedBackground />
    <Navbar />
    <main id="main-content" className="squash-case-main relative z-10">
      <div className="portfolio-container">
        <header className="skill-hero">
          <p className="sq-category">{arabic ? "المهارات" : "Skills"}</p>
          <h1>{arabic ? "كل المهارات." : "Everything I work with."}</h1>
          <p className="sq-lead">{arabic ? "اختار مهارة وشوف كل الشغل اللي استخدمها." : "Pick a skill to see every project, site and activity that used it."}</p>
          <label className="skills-search glass-surface"><Search size={18} aria-hidden /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={arabic ? "دور على مهارة" : "Search skills"} aria-label={arabic ? "دور على مهارة" : "Search skills"} /></label>
        </header>
        {groups.map((group) => {
          const list = filtered.filter((skill) => skill.group === group);
          if (list.length === 0) return null;
          return <section key={group} className="squash-case-section" aria-label={group}>
            <header className="sq-section-heading"><h2>{group}</h2></header>
            <ul className="skill-chip-grid">
              {list.map((skill) => {
                const count = itemsForSkill(skill.slug, includeActivities).length;
                return <li key={skill.slug}><Link to={`/skills/${skill.slug}`} className="skill-chip"><span><strong>{skill.name}</strong><small>{skill.blurb}</small></span><em>{count}</em><ArrowRight size={16} aria-hidden /></Link></li>;
              })}
            </ul>
          </section>;
        })}
        {filtered.length === 0 && <p className="wk-prose">{arabic ? "مفيش نتايج." : "No skills match that search."}</p>}
      </div>
    </main>
    <Footer />
  </div>;
}
