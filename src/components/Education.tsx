import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

const educationIcons = [GraduationCap, Award, BookOpen];

const Education = () => {
  const { dict } = useLanguage();
  const education = dict.education.items;

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {dict.education.title}
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => {
            const Icon = educationIcons[index] ?? GraduationCap;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {edu.title}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground font-semibold">
                          {edu.period}
                        </span>
                      </div>
                      <CardDescription className="text-base">
                        <span className="text-accent font-semibold">{edu.institution}</span>
                        {edu.location && <span> • {edu.location}</span>}
                        <br />
                        {edu.details}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
