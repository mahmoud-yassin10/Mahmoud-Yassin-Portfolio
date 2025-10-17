import { Code2, Wrench, Brain } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Dart", "Python", "JavaScript", "PHP", "HTML", "CSS", "TypeScript"]
  },
  {
    title: "Tools & Frameworks",
    icon: Wrench,
    skills: ["Flutter", "Firebase", "React", "Git", "GitHub", "VS Code", "Node.js"]
  },
  {
    title: "Concepts & Practices",
    icon: Brain,
    skills: ["OOP", "Data Structures", "Algorithms", "Agile", "Unit Testing", "Debugging", "CI/CD"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium text-foreground transition-colors duration-300 hover:scale-105 transform"
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
