import { Users, Award, TrendingUp, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

const initiativeIcons = [Users, Award, TrendingUp, Zap, Heart];
const initiativeColors = ["text-primary", "text-accent", "text-primary", "text-accent", "text-primary"];

const Initiatives = () => {
  const { dict } = useLanguage();
  const initiatives = dict.initiatives.items;

  return (
    <section id="initiatives" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {dict.initiatives.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {initiatives.map((initiative, index) => {
            const Icon = initiativeIcons[index] ?? Users;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4 mb-2">
                    <div className={`p-3 bg-primary/10 rounded-xl ${initiativeColors[index]} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {initiative.title}
                      </CardTitle>
                      <p className="text-sm text-accent font-semibold">{initiative.role}</p>
                      <p className="text-xs text-muted-foreground">{initiative.period}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {initiative.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <span className="text-sm font-semibold text-primary">
                      {initiative.impact}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
