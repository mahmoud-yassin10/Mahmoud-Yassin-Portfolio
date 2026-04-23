import { ArrowRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { ProjectLivePreview } from "@/components/ProjectLivePreview";

type ClientWorkTileProps = {
  project: Project;
  index: number;
};

export const ClientWorkTile = ({ project, index }: ClientWorkTileProps) => {
  const liveUrl = project.externalLink?.trim();
  const internalTo = `/projects/${project.slug}`;

  const cardStyle = {
    animationDelay: `${index * 0.1}s`,
    display: "flex",
    flexDirection: "column" as const,
    height: "100%"
  };

  return (
    <Card
      className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-300 animate-fade-in hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/10"
      style={cardStyle}
    >
      <ProjectLivePreview
        liveUrl={liveUrl}
        title={project.title}
        variant="card"
        className="rounded-t-xl rounded-b-none border-x-0 border-t-0 border-b border-border shadow-none"
      />

      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary">{project.type}</Badge>
          <span className="text-sm text-muted-foreground shrink-0">{project.period}</span>
        </div>
        <CardTitle className="text-2xl transition-colors group-hover:text-primary">{project.title}</CardTitle>
        <CardDescription className="text-base">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <Badge key={i} variant="outline" className="border-primary/30">
              <Code2 className="w-3 h-3 mr-1" />
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button
            variant="default"
            className="w-full flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-95 sm:w-auto"
            asChild
          >
            <Link to={internalTo}>
              <ArrowRight className="mr-2 h-4 w-4" />
              View case study
            </Link>
          </Button>
          {liveUrl ? (
            <Button variant="outline" className="w-full flex-1 border-primary/40 sm:w-auto" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                Live site
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
