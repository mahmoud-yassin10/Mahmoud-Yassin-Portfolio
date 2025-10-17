import { ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Flousy",
    description: "AI-powered financial planning app helping families track expenses, set budgets, and achieve financial goals. Supports both English and Arabic.",
    tech: ["Flutter", "Firebase", "AI/ML", "Dart"],
    year: "2024",
    link: "#",
    type: "App"
  },
  {
    title: "AI VAR for Squash",
    description: "Computer vision-based officiating tool using machine learning to detect lets and strokes in squash matches with high accuracy.",
    tech: ["Python", "OpenCV", "Machine Learning", "CV"],
    year: "2024",
    link: "#",
    type: "In Progress"
  },
  {
    title: "Solar Share",
    description: "Peer-to-peer solar energy marketplace enabling homeowners to share excess renewable energy. Winner of Best Idea at Ignited Hackathon.",
    tech: ["React", "Firebase", "Maps API", "Web3"],
    year: "2024",
    link: "#",
    type: "Platform"
  },
  {
    title: "Flood Lens",
    description: "NASA Space Apps Challenge winner - web application using satellite data to detect and predict flood risks in vulnerable regions.",
    tech: ["JavaScript", "NASA API", "Data Viz", "Python"],
    year: "2024",
    link: "#",
    type: "Web App"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Technical Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {project.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <Badge key={i} variant="outline" className="border-primary/30">
                      <Code2 className="w-3 h-3 mr-1" />
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="default" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all"
                  asChild
                >
                  <a href={project.link}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
