import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const education = [
  {
    title: "High School Diploma",
    institution: "Dr. Nermien Ismail Schools (NIS)",
    location: "Port Said, Egypt",
    details: "GPA: 4.0 (Predicted Valedictorian)",
    period: "Sep 2022 – May 2026",
    icon: GraduationCap,
    achievements: [
      "Perfect 4.0 GPA across all subjects",
      "Predicted Valedictorian of graduating class",
      "SAT: 1500 (780 Math, 720 English)",
      "IELTS: Registered for November (Target 8.0+)",
      "Class President – Grade 12"
    ]
  },
  {
    title: "Junior Presidential Leadership Program (JPLP)",
    institution: "National Training Academy (NTA)",
    location: "Cairo, Egypt",
    details: "Top 1.37% of 7,315 applicants",
    period: "Aug 2025 – Sep 2025",
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
    institution: "Harvard edX, MITx, and more",
    location: "Online",
    details: "Self-directed technical education",
    period: "2024 – Present",
    icon: BookOpen,
    achievements: [
      "CS50's Introduction to Programming with Python (Harvard edX, Nov 2024 – Jan 2025)",
      "CS50's Introduction to Computer Science (Harvard edX, Sep 2024 – Nov 2024)",
      "CS50's Introduction to AI with Python (Harvard edX, Jan 2025 – Mar 2025)",
      "Data Science Series: R Basics, Visualization, Probability, Inference, ML (Harvard edX, 2025)",
      "Machine Learning with Python (MITx, Sep 2025 – Dec 2025)",
      "iSchool Full Software & AI Curriculum",
      "CLS Python Course – Intensive Training"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Education
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => {
            const Icon = edu.icon;
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
