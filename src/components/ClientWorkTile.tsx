import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Code2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Multiple thumbnail APIs — free tiers can be flaky; we cycle on failure (see handlers below). */
function buildScreenshotCandidates(siteUrl: string): string[] {
  const encoded = encodeURIComponent(siteUrl);
  return [
    `https://s0.wp.com/mshots/v1/${encoded}?w=900`,
    `https://image.thum.io/get/width/720/crop/960/noanimate/${encoded}`
  ];
}

function safeHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Some CDNs return HTTP 200 with a 1×1 or tiny placeholder — treat as failure. */
function isLikelyBadThumbnail(img: HTMLImageElement) {
  return img.naturalWidth < 48 || img.naturalHeight < 48;
}

type ClientWorkTileProps = {
  project: Project;
  index: number;
};

export const ClientWorkTile = ({ project, index }: ClientWorkTileProps) => {
  const liveUrl = project.externalLink?.trim();
  const internalTo = `/projects/${project.slug}`;

  const candidates = useMemo(() => (liveUrl ? buildScreenshotCandidates(liveUrl) : []), [liveUrl]);

  /** Index into `candidates`; once >= length, we show live iframe fallback. */
  const [thumbAttempt, setThumbAttempt] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setThumbAttempt(0);
    setImgLoaded(false);
    setIframeLoaded(false);
  }, [liveUrl]);

  const showIframeFallback = Boolean(liveUrl && candidates.length > 0 && thumbAttempt >= candidates.length);
  const currentThumbSrc = liveUrl && !showIframeFallback ? candidates[thumbAttempt] : undefined;

  const advanceThumbnail = () => {
    setImgLoaded(false);
    setThumbAttempt((n) => n + 1);
  };

  const handleImgLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (isLikelyBadThumbnail(e.currentTarget)) {
      advanceThumbnail();
      return;
    }
    setImgLoaded(true);
  };

  const handleImgError = () => {
    advanceThumbnail();
  };

  const cardStyle = {
    animationDelay: `${index * 0.1}s`,
    display: "flex",
    flexDirection: "column" as const,
    height: "100%"
  };

  const hostname = liveUrl ? safeHostname(liveUrl) : "";

  const showSkeleton = Boolean(
    liveUrl &&
      ((!showIframeFallback && !imgLoaded && thumbAttempt < candidates.length) ||
        (showIframeFallback && !iframeLoaded))
  );

  return (
    <Card
      className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-300 animate-fade-in hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/10"
      style={cardStyle}
    >
      <div className="border-b border-border bg-gradient-to-b from-muted/40 to-muted/10">
        <div className="flex h-10 items-center gap-2 border-b border-border/80 px-3 sm:px-4">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90 shadow-sm" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90 shadow-sm" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90 shadow-sm" />
          </span>
          <div className="flex min-h-8 min-w-0 flex-1 items-center rounded-md border border-border/60 bg-background/90 px-2 py-1 shadow-inner">
            <Globe className="mr-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="truncate text-center text-[11px] font-mono text-muted-foreground sm:text-xs">
              {hostname || "Live site"}
            </span>
          </div>
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary"
              aria-label={`Open ${project.title} live site`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
          {/* Loading pulse until image or iframe paints */}
          {liveUrl && (showSkeleton || (showIframeFallback && !iframeLoaded)) ? (
            <div
              className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-muted via-muted/80 to-muted"
              aria-hidden
            />
          ) : null}

          {liveUrl && currentThumbSrc && !showIframeFallback ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-[2] block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <img
                key={`${currentThumbSrc}-${thumbAttempt}`}
                src={currentThumbSrc}
                alt={`Homepage preview of ${project.title}`}
                className={cn(
                  "h-full w-full object-cover object-top transition duration-500 ease-out",
                  imgLoaded ? "opacity-100" : "opacity-0",
                  "group-hover:brightness-[1.03]"
                )}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={handleImgLoad}
                onError={handleImgError}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          ) : null}

          {liveUrl && showIframeFallback ? (
            <div className="relative z-[2] h-full w-full">
              {/* Live embed (zoomed out). Some hosts send empty frames — full-area link always opens the real URL. */}
              <iframe
                title={`Live preview of ${project.title}`}
                src={liveUrl}
                className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setIframeLoaded(true)}
              />
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                aria-label={`Open ${project.title} live site in a new tab`}
              />
            </div>
          ) : null}

          {!liveUrl ? (
            <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 text-center">
              <Globe className="h-12 w-12 text-muted-foreground/40" aria-hidden />
              <p className="text-sm font-medium text-foreground">No live URL</p>
              <p className="max-w-xs text-xs text-muted-foreground">No public URL on file for this entry.</p>
            </div>
          ) : null}
        </div>
      </div>

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
