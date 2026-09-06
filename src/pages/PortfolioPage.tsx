import { Award, BookOpen } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Awards from "@/components/Awards";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

const certificationIcons = [Award, BookOpen];

const PortfolioPage = () => {
  const { t, dict } = useLanguage();
  const certifications = dict.education.items.slice(1);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Experience />
        <Education />
        <Awards />
        <Skills />

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("portfolio.certifications")}
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {certifications.map((certification, index) => {
                const Icon = certificationIcons[index] ?? Award;
                return (
                  <Card
                    key={certification.title}
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
                              {certification.title}
                            </CardTitle>
                            <span className="text-sm text-muted-foreground font-semibold">
                              {certification.period}
                            </span>
                          </div>
                          <CardDescription className="text-base">
                            <span className="text-accent font-semibold">{certification.institution}</span>
                            <br />
                            {certification.details}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {certification.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
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
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
