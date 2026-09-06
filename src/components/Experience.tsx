import { Briefcase } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Experience = () => {
  const { dict } = useLanguage();
  const experiences = dict.experience.items;

  return (
    <section id="experience" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {dict.experience.title}
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse-glow" />

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.organization}</p>
                    <p className="text-sm text-muted-foreground">{exp.location} • {exp.period}</p>
                  </div>
                </div>

                <p className="text-card-foreground mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
