import { ExternalLink, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, type ProjectTileData } from "@/data/projects";

type ProjectTileProps = {
  project: ProjectTileData;
  index: number;
  buttonLabel?: string;
  linkRel?: string;
  linkTarget?: "_blank" | "_self" | "_parent" | "_top";
  forceButton?: boolean;
  alignButton?: boolean;
};

export const ProjectTile = ({
  project,
  index,
  buttonLabel = "View project",
  linkRel = "noopener noreferrer",
  linkTarget = "_blank",
  forceButton = false,
  alignButton = false
}: ProjectTileProps) => {
  const internalTo = project.slug ? `/projects/${project.slug}` : undefined;
  const linkHref = internalTo ?? project.link;
  const hasLink = Boolean(linkHref && linkHref !== "#");
  const shouldShowButton = forceButton || hasLink;

  const cardStyle = alignButton
    ? {
        animationDelay: `${index * 0.1}s`,
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }
    : { animationDelay: `${index * 0.1}s` };

  return (
    <Card
      className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border animate-fade-in"
      style={cardStyle}
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
      <CardContent
        style={
          alignButton
            ? {
                display: "flex",
                flexDirection: "column",
                flex: 1
              }
            : undefined
        }
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <Badge key={i} variant="outline" className="border-primary/30">
              <Code2 className="w-3 h-3 mr-1" />
              {tech}
            </Badge>
          ))}
        </div>
        {shouldShowButton && (
          <div style={alignButton ? { marginTop: "auto" } : undefined}>
            <Button
              variant="default"
              className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all"
              asChild
            >
              {internalTo ? (
                <Link to={internalTo}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {buttonLabel}
                </Link>
              ) : (
                <a href={linkHref || "#"} target={linkTarget} rel={linkRel}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {buttonLabel}
                </a>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type ProjectsProps = {
  limit?: number;
  ctaHref?: string;
  ctaLabel?: string;
};

const Projects = ({ limit, ctaHref, ctaLabel = "View all projects" }: ProjectsProps) => {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects;
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Technical Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {visibleProjects.map((project, index) => (
            <ProjectTile
              key={index}
              project={project}
              index={index}
              forceButton
              linkTarget="_self"
              alignButton
            />
          ))}
        </div>
        {ctaHref && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
