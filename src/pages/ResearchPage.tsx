import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import CaseStudySections from "@/components/CaseStudySections";
import { getCaseStudy } from "@/data/caseStudies";
import { caseStudiesAr } from "@/data/caseStudiesAr";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ResearchPage() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const study = arabic ? caseStudiesAr.find((item) => item.slug === "squashvar")! : getCaseStudy("squashvar")!;
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <header className="mb-12 max-w-3xl">
              <p className="text-primary font-medium mb-3">{arabic ? "بحث في الرؤية الحاسوبية" : "Computer vision research"}</p>
              <h1 className="text-4xl md:text-6xl mb-6">SquashVAR</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {arabic
                  ? "نموذج بحثي لمساعدة حكام الاسكواش باستخدام كاميرا واحدة. بيجمع كشف وتتبع الكرة ومعايرة الملعب وكشف الارتطام، وبيمتنع عن القرار قرب الخطوط. التقييم بيفصل أداء كاشف الكرة عن كشف الارتطام وعن دقة قرار الخط اللي لسه متقاستش."
                  : "A research prototype for assisting squash referees with one camera. It combines ball detection and tracking, calibrated court geometry, impact detection and abstention near court lines. The evaluation separates detector performance from impact detection and line-call accuracy, which has not yet been measured."}
              </p>
              <p className="mt-6 border-y border-border py-4 text-sm font-medium">
                {arabic ? "حالة البحث: النسخة المنقحة مقدّمة وفي انتظار المراجعة. البحث لم يُنشر بعد." : "Manuscript status: revised and submitted, awaiting review. The paper is not published."}
              </p>
            </header>
            <CaseStudySections study={study} />
            <Link to="/work" className="inline-block mt-12 text-primary font-semibold underline underline-offset-4">
              {arabic ? "استكشف باقي المشاريع" : "Explore the other projects"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
