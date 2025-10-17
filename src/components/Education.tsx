import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const education = [
  {
    title: "High School Diploma",
    institution: "Narmer International School",
    details: "GPA: 4.0 (Valedictorian)",
    year: "2025",
    icon: GraduationCap,
    achievements: [
      "Perfect 4.0 GPA across all subjects",
      "School Valedictorian",
      "Leadership in multiple student organizations"
    ]
  },
  {
    title: "Junior Presidential Leadership Program",
    institution: "Egyptian Government",
    details: "Top 1.37% of 7,000+ applicants",
    year: "2024",
    icon: Award,
    achievements: [
      "Selected from competitive national pool",
      "Leadership development and civic engagement",
      "National recognition for excellence"
    ]
  },
  {
    title: "Online Courses & Certifications",
    institution: "Harvard, MIT, Stanford",
    details: "Self-directed technical education",
    year: "2022-2024",
    icon: BookOpen,
    achievements: [
      "CS50's Introduction to Computer Science (Harvard)",
      "CS50's Introduction to Artificial Intelligence (Harvard)",
      "Machine Learning with Python (MITx)",
      "Data Science Fundamentals (Harvard edX)"
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
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {edu.title}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground font-semibold">
                          {edu.year}
                        </span>
                      </div>
                      <CardDescription className="text-base">
                        <span className="text-accent font-semibold">{edu.institution}</span>
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
