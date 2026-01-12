import { Code2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getProjectBySlug } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const externalHref = project?.externalLink ?? project?.externalLinkPlaceholder ?? "#";
  const isExternal = /^https?:\/\//i.test(externalHref);
  const canOpenExternal = Boolean(externalHref && externalHref !== "#");

  if (!project) {
    return (
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <AnimatedBackground />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
              <div className="text-center space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Project not found
                </h2>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/work">Back to projects</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  {project.description}
                </p>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/30">
                        <Code2 className="w-3 h-3 mr-1" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Skills Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsUsed.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl">Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl">What I did</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                {canOpenExternal ? (
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a
                      href={externalHref}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      Open project
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    disabled
                  >
                    Open project
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/work">Back to projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
