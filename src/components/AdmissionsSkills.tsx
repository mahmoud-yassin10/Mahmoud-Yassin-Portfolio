import { BrainCircuit, Code2, Cloud, Layers, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const groups = [
  { icon: Code2, en: "Languages", ar: "اللغات", items: ["TypeScript", "JavaScript", "Python", "Dart", "C#", "SQL", "HTML", "CSS"], more: ["Java", "PHP"] },
  { icon: Layers, en: "Frameworks", ar: "أطر العمل", items: ["Next.js", "React", "Flutter", "ASP.NET Core", "WPF", "Node.js", "Tailwind CSS"], more: [] },
  { icon: Cloud, en: "Data and cloud", ar: "البيانات والسحابة", items: ["PostgreSQL", "SQLite", "Cloud Firestore", "Prisma", "Firebase", "Cloud Functions", "Vercel", "Cloudflare R2", "Docker", "Git"], more: [] },
  { icon: BrainCircuit, en: "AI, ML and vision", ar: "الذكاء الاصطناعي والرؤية", items: ["scikit-learn", "OpenCV", "YOLOv8", "BoT-SORT", "Gemini API", "Tesseract OCR", "TF-IDF"], more: [] },
  { icon: ShieldCheck, en: "How I work", ar: "طريقة الشغل", items: ["REST APIs", "Authentication", "Offline-first sync", "Testing", "Debugging", "Deployment", "Technical documentation"], more: [] }
];

const arabicItems: Record<string, string> = {
  "REST APIs": "REST APIs", "Authentication": "تسجيل الدخول والصلاحيات", "Offline-first sync": "مزامنة تعمل بدون إنترنت", "Testing": "الاختبار",
  "Debugging": "تصحيح الأخطاء", "Deployment": "النشر", "Technical documentation": "التوثيق التقني"
};

export default function AdmissionsSkills() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return <section id="skills" className="portfolio-section portfolio-container">
    <header className="section-heading"><h2>{arabic ? "الأدوات اللي بشتغل بيها." : "The tools I work with."}</h2></header>
    <div className="skills-grid">
      {groups.map((group) => {
        const Icon = group.icon;
        return <article key={group.en} className="skills-card glass-surface">
          <span className="skills-icon"><Icon size={22} strokeWidth={1.5} aria-hidden /></span>
          <h3>{arabic ? group.ar : group.en}</h3>
          <ul>
            {group.items.map((item) => <li key={item}><bdi>{arabic ? arabicItems[item] ?? item : item}</bdi></li>)}
          </ul>
          {group.more.length > 0 && <p className="skills-more">{arabic ? "كمان أعرف:" : "Also familiar with:"} <bdi>{group.more.join(", ")}</bdi></p>}
        </article>;
      })}
    </div>
  </section>;
}
