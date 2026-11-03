import { useLanguage } from "@/i18n/LanguageContext";

const milestones = [
  { date: "2023", en: "Began freelance software development", ar: "بداية تطوير البرمجيات بشكل مستقل", detail: "Built and maintained websites and apps for clients.", detailAr: "بناء وصيانة مواقع وتطبيقات للعملاء." },
  { date: "2024–2025", en: "Built Solar Share", ar: "تطوير Solar Share", detail: "A neighborhood solar-sharing prototype, recognized with the Ignited Hackathon Best Idea Award in 2025.", detailAr: "نموذج أولي لمشاركة الطاقة الشمسية بين البيوت، فاز بأفضل فكرة في هاكاثون Ignited سنة ٢٠٢٥." },
  { date: "2025", en: "Research and team projects", ar: "البحث ومشاريع الفريق", detail: "Worked on SquashVAR and led the five-person Flood Lens team at NASA Space Apps, earning Port Said first place and Global Nominee recognition.", detailAr: "اشتغلت على SquashVAR وقدت فريق Flood Lens في NASA Space Apps، مع المركز الأول في بورسعيد وترشيح عالمي Global Nominee." },
  { date: "2026", en: "Maintaining software people use", ar: "صيانة برامج ناس بتستخدمها", detail: "Joined TrueTutor in February and became its sole active developer in May. Continued developing Flousy and graduated from NIS as salutatorian.", detailAr: "انضميت لـTrueTutor في فبراير وبقيت المطوّر النشط الوحيد من مايو. كملت تطوير فلوسي واتخرجت من NIS في المركز التاني على الدفعة." }
];

export default function AdmissionsJourney() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="journey" className="py-20 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-5xl mb-10">{arabic ? "محطات في الشغل" : "How the work developed"}</h2>
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item) => (
            <li key={item.date} className="border-t border-border pt-5 min-w-0">
              <p className="text-primary font-semibold mb-3"><bdi>{item.date}</bdi></p>
              <h3 className="text-xl font-semibold mb-2">{arabic ? item.ar : item.en}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{arabic ? item.detailAr : item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
