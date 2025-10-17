import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Freelance Developer",
    organization: "Self-Employed",
    period: "2023 - Present",
    description: "Developed custom websites and mobile applications for local businesses, delivering end-to-end solutions from design to deployment.",
    achievements: [
      "Built 10+ responsive websites using React and Flutter",
      "Implemented e-commerce solutions with payment integrations",
      "Maintained 100% client satisfaction rate"
    ]
  },
  {
    role: "Software Development Intern",
    organization: "Dr. Nermien Ismail Schools",
    period: "Summer 2024",
    description: "Contributed to quality assurance and debugging processes for educational software systems.",
    achievements: [
      "Identified and documented 50+ bugs in production systems",
      "Collaborated with development team on bug fixes",
      "Improved QA testing procedures and documentation"
    ]
  },
  {
    role: "Robotics & Coding Instructor",
    organization: "Various Educational Programs",
    period: "2022 - Present",
    description: "Taught robotics and programming fundamentals to students aged 6-18, fostering early interest in STEM.",
    achievements: [
      "Instructed 100+ students in Python, Scratch, and robotics",
      "Designed curriculum for multiple age groups",
      "Mentored students in competition preparation"
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
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
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
