import { useLanguage } from "@/i18n/LanguageContext";
import { featuredStoriesAr } from "@/data/admissionsAr";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredStories } from "@/data/admissions";

const AdmissionsStories = () => {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const items = arabic ? featuredStoriesAr : featuredStories;
  return (
  <section id="stories" className="py-20 relative">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <p className="audience-hero-eyebrow mb-3">{arabic ? "تلات مشاريع بنيتها" : "Three things I built"}</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12 max-w-3xl">
          {arabic ? "كل مشروع بدأ بسؤال عن إزاي أساعد حد ياخد قرار." : "Each one started with a question about how to help someone decide."}
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((story, index) => (
            <article
              key={story.slug}
              className="flex flex-col rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8"
            >
              <p className="text-sm text-muted-foreground mb-1">0{index + 1} · {story.role}</p>
              <h3 className="text-2xl font-bold mb-5">{story.name}</h3>

              <dl className="space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="font-semibold text-primary mb-1">{arabic ? "المشكلة" : "The problem"}</dt>
                  <dd className="text-muted-foreground">{story.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary mb-1">{arabic ? "اللي بنيته" : "What I built"}</dt>
                  <dd className="text-muted-foreground">{story.built}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary mb-1">{arabic ? "الأدلة" : "Evidence"}</dt>
                  <dd>
                    <ul className="space-y-1 text-muted-foreground">
                      {story.evidence.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-primary" aria-hidden>▸</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <Link
                to={`/projects/${story.slug}`}
                className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:underline pt-2"
              >
                {arabic ? "اقرأ تفاصيل المشروع" : "Read the case study"} <ArrowUpRight size={16} aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default AdmissionsStories;
