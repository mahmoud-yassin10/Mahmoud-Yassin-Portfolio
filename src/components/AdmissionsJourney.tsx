import { useLanguage } from "@/i18n/LanguageContext";

const milestones = [
  { date: "May 2023", dateAr: "مايو ٢٠٢٣", value: "2023-05", title: "Started building for clients", titleAr: "بداية الشغل مع العملاء", detail: "Freelance websites and apps, from requirements to deployment and maintenance.", detailAr: "مواقع وتطبيقات بشكل مستقل، من فهم المتطلبات لحد النشر والصيانة." },
  { date: "Sep 2024", dateAr: "سبتمبر ٢٠٢٤", value: "2024-09", title: "Solar Share", titleAr: "Solar Share", detail: "Started a solar-sharing prototype. It won Best Idea at Ignited in 2025.", detailAr: "بداية نموذج مشاركة الطاقة الشمسية، اللي فاز بأفضل فكرة في Ignited سنة ٢٠٢٥." },
  { date: "Jan 2025", dateAr: "يناير ٢٠٢٥", value: "2025-01", title: "Building Flousy", titleAr: "بناء فلوسي", detail: "An independent personal-finance app with Arabic and English interfaces.", detailAr: "تطبيق مالي مستقل بواجهة عربي وإنجليزي." },
  { date: "Fall 2025", dateAr: "خريف ٢٠٢٥", value: "2025", title: "Research & NASA Space Apps", titleAr: "البحث وNASA Space Apps", detail: "SquashVAR research and leading Flood Lens, Port Said first place and Global Nominee.", detailAr: "بحث SquashVAR وقيادة Flood Lens، الأول في بورسعيد وترشيح عالمي Global Nominee." },
  { date: "Feb 2026", dateAr: "فبراير ٢٠٢٦", value: "2026-02", title: "Joined TrueTutor", titleAr: "الانضمام لـTrueTutor", detail: "Joined an existing production platform to build and maintain learning tools.", detailAr: "انضميت لمنصة شغالة عشان أطوّر وأصون أدوات التعلّم." },
  { date: "May 2026", dateAr: "مايو ٢٠٢٦", value: "2026-05", title: "Taking ownership", titleAr: "مسؤولية أكبر", detail: "Became TrueTutor’s sole active developer, supporting the platform while shipping features.", detailAr: "بقيت المطوّر النشط الوحيد لـTrueTutor، بدعم المنصة وبضيف مميزات." }
];

export default function AdmissionsJourney() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return <section id="journey" className="portfolio-section portfolio-container">
    <header className="section-heading"><p>{arabic ? "الرحلة لحد دلوقتي" : "The journey so far"}</p><h2>{arabic ? "كل خطوة بتفتح سؤال جديد." : "One project led to the next."}</h2></header>
    <ol className="journey-line">{milestones.map((item) => <li key={item.value}><time dateTime={item.value}>{arabic ? item.dateAr : item.date}</time><span className="journey-node" aria-hidden /><h3>{arabic ? item.titleAr : item.title}</h3><p>{arabic ? item.detailAr : item.detail}</p></li>)}</ol>
  </section>;
}
