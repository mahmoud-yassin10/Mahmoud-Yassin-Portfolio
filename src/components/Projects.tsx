import { ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Flousy — AI Financial Planner",
    description: "AI-powered financial planning app helping Egyptian families navigate inflation. Features expense tracking, category budgets, goal setting, bill reminders, and bilingual (AR/EN) UI. Publishing soon on Play Store.",
    tech: ["Flutter", "Firebase Auth", "AI/ML", "Git", "Dart"],
    period: "Jan 2025 – Present",
    link: "#",
    type: "Mobile App"
  },
  {
    title: "AI VAR for Squash",
    description: "Computer vision-based officiating system detecting 'in' vs 'out' shots on front and side walls, tracking ball bounces and player movement. Research paper in progress for sports-technology journal.",
    tech: ["Python", "OpenCV", "ML/CV", "Video Analysis"],
    period: "Aug 2025 – Present",
    link: "#",
    type: "Research"
  },
  {
    title: "Solar Share",
    description: "Peer-to-peer solar energy marketplace enabling households to share surplus renewable power. Won Best Idea at Ignited Hackathon with +2M virtual funding. Promotes community sustainability.",
    tech: ["JavaScript", "Firebase", "Prototype", "Maps API"],
    period: "Sep 2024 – May 2025",
    link: "#",
    type: "Platform"
  },
  {
    title: "Flood Lens",
    description: "NASA Space Apps Challenge 1st Place (Port Said) & Global Nominee. Web app integrating NASA's real-time satellite data (IMERG, OPERA SAR, DEM) to detect and visualize flood risk globally.",
    tech: ["JavaScript", "NASA APIs", "Data Viz", "Satellite Data"],
    period: "Oct 2025",
    link: "https://mahmoud-yassin10.github.io/flood-lens-nasa/",
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
                  <span className="text-sm text-muted-foreground">{project.period}</span>
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
