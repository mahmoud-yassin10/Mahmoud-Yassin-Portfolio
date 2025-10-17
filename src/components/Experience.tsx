import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Software Development Intern",
    organization: "Dr. Nermien Ismail Schools",
    location: "Remote",
    period: "May 2025 – Present",
    description: "Contributing to the NIS Parents app with feature updates and stability improvements.",
    achievements: [
      "Collaborated on small feature updates and bug fixes for production app",
      "Reproduced and resolved issues efficiently with clear step-by-step documentation",
      "Tested new builds end-to-end and filed detailed bug reports with evidence",
      "Applied version control (Git) and issue triage best practices"
    ]
  },
  {
    role: "Freelance Developer",
    organization: "Self-Employed",
    location: "Port Said, Egypt",
    period: "May 2023 – Present",
    description: "Delivered custom websites and mobile applications for local businesses using modern technologies.",
    achievements: [
      "Built responsive websites using HTML, CSS, JavaScript, and PHP",
      "Developed cross-platform mobile apps with Flutter/Dart",
      "Managed full project lifecycle from requirements to deployment",
      "Maintained strong client relationships and 100% project delivery rate"
    ]
  },
  {
    role: "Local Coding & Robotics Instructor",
    organization: "Community Education",
    location: "Port Said, Egypt",
    period: "Jun 2025 – Present",
    description: "Teaching coding and robotics fundamentals to children ages 6-18, inspiring the next generation of innovators.",
    achievements: [
      "Created engaging curriculum for Scratch, Python, and Arduino",
      "Instructed students across multiple age groups and skill levels",
      "Fostered creativity and problem-solving skills through hands-on projects",
      "Built strong rapport with students and parents in the community"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Experience
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot */}
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
