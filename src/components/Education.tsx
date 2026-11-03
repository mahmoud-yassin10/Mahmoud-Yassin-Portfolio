import { Award, BookOpenCheck, GraduationCap, Languages, Landmark } from "lucide-react";
import CountUp from "@/components/CountUp";
import { useLanguage } from "@/i18n/LanguageContext";

const scores = [
  { icon: Award, value: "4.0", label: "GPA, rank 2 of 30", labelAr: "GPA، الترتيب ٢ من ٣٠" },
  { icon: BookOpenCheck, value: "1500", label: "SAT: 780 Math, 720 Reading & Writing", labelAr: "SAT: ٧٨٠ رياضيات، ٧٢٠ قراءة وكتابة" },
  { icon: Languages, value: "8.5", label: "IELTS Academic", labelAr: "IELTS Academic" }
];

const Education = () => {
  const { dict, lang } = useLanguage();
  const arabic = lang === "ar";
  const [school, leadership, courses] = dict.education.items;
  return (
    <section id="education" className="portfolio-section education-section relative">
      <div className="portfolio-container">
        <header className="section-heading"><h2>{dict.education.title}</h2></header>
        <div className="education-board">
          <article className="education-school glass-surface">
            <span className="education-icon"><GraduationCap size={26} strokeWidth={1.4} aria-hidden /></span>
            <p className="education-meta">{school.period}</p>
            <h3>{school.title}</h3>
            <p className="education-institution">{school.institution}<span> · {school.location}</span></p>
            <div className="education-chips">{school.achievements.filter((line) => /president|رئيس|valedictorian|salutatorian|التاني/i.test(line)).map((line) => <span key={line}>{line}</span>)}</div>
          </article>
          {scores.map((score) => {
            const Icon = score.icon;
            return <article key={score.label} className="education-score glass-surface">
              <span className="education-icon"><Icon size={22} strokeWidth={1.5} aria-hidden /></span>
              <strong><CountUp value={score.value} /></strong>
              <small>{arabic ? score.labelAr : score.label}</small>
            </article>;
          })}
          <article className="education-extra glass-surface">
            <span className="education-icon"><Landmark size={22} strokeWidth={1.5} aria-hidden /></span>
            <div><h3>{leadership.title}</h3><p>{leadership.details}</p></div>
          </article>
          <article className="education-extra glass-surface">
            <span className="education-icon"><BookOpenCheck size={22} strokeWidth={1.5} aria-hidden /></span>
            <div><h3>{courses.title}</h3><p>{courses.achievements.slice(0, 4).join(" · ")}</p></div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Education;
