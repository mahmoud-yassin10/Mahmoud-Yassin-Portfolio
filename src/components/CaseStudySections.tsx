import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

const Label = ({ children }: { children: string }) => (
  <h2 className="case-study-heading mb-5">{children}</h2>
);

const CaseStudySections = ({ study }: { study: CaseStudy }) => {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
  <div className="case-study space-y-16">
    <p className="text-xl md:text-2xl font-medium leading-snug max-w-3xl">{study.tagline}</p>

    <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {study.facts.map((fact) => (
        <div key={fact.label} className="border-t border-border pt-4 min-w-0">
          <dt className="text-2xl md:text-3xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            <bdi>{fact.value}</bdi>
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">{fact.label}</dd>
        </div>
      ))}
    </dl>

    <section>
      <Label>{arabic ? "دوري" : "My role"}</Label>
      <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">{study.role}</p>
    </section>

    <section>
      <Label>{arabic ? "المشكلة" : "The problem"}</Label>
      <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">{study.problem}</p>
    </section>

    <section>
      <Label>{arabic ? "طريقة العمل" : "How it works"}</Label>
      <ol className="grid gap-4 md:grid-cols-2">
        {study.approach.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-primary mb-2">0{index + 1}</p>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>

    {study.turningPoint ? (
      <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-10">
        <Label>{arabic ? "قرارات أثناء التطوير" : "What changed my mind"}</Label>
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">{study.turningPoint.title}</h3>
        <p className="text-lg leading-relaxed text-foreground/90 max-w-3xl">{study.turningPoint.body}</p>
      </section>
    ) : null}

    <section>
      <Label>{arabic ? "النتائج" : "Results"}</Label>
      <ul className="space-y-2 max-w-3xl">
        {study.results.map((line) => (
          <li key={line} className="flex gap-3 text-lg">
            <span className="text-primary" aria-hidden>▸</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      {study.limits.length > 0 ? (
        <div className="mt-10 max-w-3xl rounded-xl border border-border bg-muted/40 p-6">
          <p className="font-semibold mb-3">{arabic ? "حدود المشروع والأسئلة المفتوحة" : "What it doesn't do, and what I don't know yet"}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {study.limits.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden>–</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {study.status ? <p className="mt-4 text-sm text-muted-foreground max-w-3xl">{study.status}</p> : null}
      {study.links && study.links.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {study.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {link.label} <ExternalLink size={16} aria-hidden />
            </a>
          ))}
        </div>
      ) : null}
    </section>
  </div>
);
};

export default CaseStudySections;
