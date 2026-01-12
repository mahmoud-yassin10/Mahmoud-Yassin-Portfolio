import { Award, BookOpen, Globe } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Awards from "@/components/Awards";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CertificationItem = {
  title: string;
  organization: string;
  details: string;
  period: string;
  achievements: string[];
  icon: typeof Award;
};

const certifications: CertificationItem[] = [
  {
    title: "Junior Presidential Leadership Program (JPLP)",
    organization: "National Training Academy (NTA)",
    details: "Top 1.37% of 7,315 applicants",
    period: "Aug 2025 - Sep 2025",
    icon: Award,
    achievements: [
      "Selected as 1 of 100 students nationwide from 7,315+ applicants",
      "21-day intensive leadership curriculum",
      "Training in critical thinking, strategic planning, innovation, entrepreneurship",
      "Developed skills in teamwork, emotional intelligence, and work-readiness",
      "Selected as 1 of 5 role models for televised ONTV interview"
    ]
  },
  {
    title: "Online Courses & Certifications",
    organization: "Harvard edX, MITx, and more",
    details: "Self-directed technical education",
    period: "2024 - Present",
    icon: BookOpen,
    achievements: [
      "CS50's Introduction to Computer Science (Harvard edX, Sep 2024 - Nov 2024)",
      "CS50's Introduction to Programming with Python (Harvard edX, Nov 2024 - Jan 2025)",
      "CS50's Introduction to AI with Python (Harvard edX, Jan 2025 - Mar 2025)",
      "Data Science Series: R Basics, Visualization, Probability, Inference, ML (Harvard edX, 2025)",
      "Machine Learning with Python (MITx, Sep 2025 - Dec 2025)",
      "iSchool Full Software & AI Curriculum",
      "CLS Python Course - Intensive Training"
    ]
  }
];

const spokenLanguages = [
  "Arabic - Native",
  "English - Fluent (C2, IELTS 8.5 )",
  "German - A2",
  "French - A1",
  "Spanish - A1"
];

const PortfolioPage = () => {
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
              Certifications & Programs
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {certifications.map((certification, index) => {
                const Icon = certification.icon;
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
                            <span className="text-accent font-semibold">{certification.organization}</span>
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

        <section className="py-20 relative bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Spoken Languages
            </h2>

            <div className="max-w-4xl mx-auto">
              <div
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-border animate-fade-in"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Languages
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {spokenLanguages.map((language) => (
                    <span
                      key={language}
                      className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium text-foreground transition-colors duration-300 hover:scale-105 transform"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
