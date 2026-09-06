import { Code2, ExternalLink, Globe2, ListChecks, Mail, Send, Terminal } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { isLiveSiteUrl, ProjectLivePreview } from "@/components/ProjectLivePreview";
import { getProjectBySlug } from "@/data/projects";
import { getContactPageHrefWithSimilar, getServicesInquiryHrefWithSimilar } from "@/data/servicesOfferings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localizeProject } from "@/i18n/projectsAr";
import { useLanguage } from "@/i18n/LanguageContext";

function hostnameOnly(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const rawProject = slug ? getProjectBySlug(slug) : undefined;
  const project = rawProject ? localizeProject(rawProject, lang) : undefined;
  const externalHref = project?.externalLink ?? project?.externalLinkPlaceholder ?? "#";
  const isExternal = /^https?:\/\//i.test(externalHref);
  const canOpenExternal = Boolean(externalHref && externalHref !== "#");
  const liveUrlCandidate = project?.externalLink?.trim() ?? "";
  const liveUrl = isLiveSiteUrl(liveUrlCandidate) ? liveUrlCandidate : "";

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
                  {t("project.notFound")}
                </h2>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/work">{t("project.backProjects")}</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const referralContactTo = getContactPageHrefWithSimilar(project.slug);
  const referralInquiryHref = getServicesInquiryHrefWithSimilar(project.slug);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {project.description}
                </p>
              </div>

              <ProjectLivePreview
                liveUrl={liveUrl || undefined}
                livePreviewMode={project.livePreviewMode}
                title={project.title}
                variant="detail"
                livePreviewRevealDelayMs={project.livePreviewRevealDelayMs}
              />

              <div className="relative overflow-hidden rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/[0.12] via-card to-accent/[0.08] p-6 shadow-xl shadow-primary/10 md:p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" aria-hidden />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" aria-hidden />
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3 max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("project.likeEyebrow")}</p>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {t("project.likeTitle")}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("project.likeBody")}
                    </p>
                    {liveUrl ? (
                      <p className="flex items-center gap-2 rounded-lg border border-border/80 bg-background/60 px-3 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                        <Globe2 className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        <span className="truncate font-mono">{hostnameOnly(liveUrl)}</span>
                      </p>
                    ) : null}
                  </div>

                  <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col xl:w-[280px] xl:flex-col">
                    {canOpenExternal ? (
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-accent shadow-md hover:opacity-95 sm:flex-1 lg:flex-none"
                        asChild
                      >
                        <a href={externalHref} target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noreferrer" : undefined}>
                          <ExternalLink className="me-2 h-5 w-5 shrink-0" />
                          {t("project.openLive")}
                        </a>
                      </Button>
                    ) : null}
                    <Button size="lg" variant="secondary" className="w-full border border-primary/25 bg-card/80 hover:bg-card sm:flex-1 lg:flex-none" asChild>
                      <Link to={referralContactTo}>
                        <Mail className="me-2 h-5 w-5 shrink-0" />
                        {t("project.likeContact")}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full border-primary/40 bg-background/50 backdrop-blur-sm sm:flex-1 lg:flex-none" asChild>
                      <a href={referralInquiryHref}>
                        <Send className="me-2 h-5 w-5 shrink-0" />
                        {t("project.likeRequest")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">{t("project.stack")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/30">
                        <Code2 className="w-3 h-3 me-1" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {project.programmingLanguages.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Terminal className="h-6 w-6 text-accent shrink-0" aria-hidden />
                      {t("project.runtime")}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-normal">
                      {t("project.runtimeHint")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.programmingLanguages.map((lang) => (
                        <Badge key={lang} variant="outline" className="border-primary/30">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {project.contentLanguages.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Globe2 className="h-6 w-6 text-accent shrink-0" aria-hidden />
                      {t("project.contentLangs")}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-normal">
                      {t("project.contentLangsHint")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.contentLanguages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">{t("project.skillsUsed")}</CardTitle>
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
                  <CardTitle className="text-2xl">{t("project.overview")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed">{project.longDescription}</p>
                </CardContent>
              </Card>

              {project.features.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <ListChecks className="h-6 w-6 text-accent shrink-0" aria-hidden />
                      {t("project.features")}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-normal">
                      {t("project.featuresHint")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("project.highlights")}</CardTitle>
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
                    <CardTitle className="text-2xl">{t("project.whatIDid")}</CardTitle>
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

              <div className="flex flex-col items-center gap-4 border-t border-border pt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  asChild
                >
                  <Link to="/work">{t("project.backWork")}</Link>
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
