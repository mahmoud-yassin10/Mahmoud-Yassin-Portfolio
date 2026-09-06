import { Code2, Wrench, Brain, Users as UsersIcon, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const categoryIcons = [Code2, Wrench, Brain, UsersIcon, Wrench, Globe];

const Skills = () => {
  const { dict } = useLanguage();
  const skillCategories = dict.skills.categories;

  return (
    <section id="skills" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {dict.skills.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[index] ?? Code2;
            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium text-foreground transition-colors duration-300 hover:scale-105 transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
