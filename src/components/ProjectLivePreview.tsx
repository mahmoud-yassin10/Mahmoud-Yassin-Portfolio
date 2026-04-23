import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

/** Multiple thumbnail APIs — free tiers can be flaky; we cycle on failure. */
export function buildScreenshotCandidates(siteUrl: string): string[] {
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

function isLikelyBadThumbnail(img: HTMLImageElement) {
  return img.naturalWidth < 48 || img.naturalHeight < 48;
}

type ProjectLivePreviewProps = {
  liveUrl?: string | null;
  title: string;
  /** Larger frame for project detail vs work cards */
  variant?: "card" | "detail";
  className?: string;
};

/**
 * Browser-style live preview: mshots thumbnail with iframe fallback (same strategy as client work tiles).
 */
export function ProjectLivePreview({ liveUrl, title, variant = "card", className }: ProjectLivePreviewProps) {
  const url = liveUrl?.trim() || "";
  const candidates = useMemo(() => (url ? buildScreenshotCandidates(url) : []), [url]);

  const [thumbAttempt, setThumbAttempt] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setThumbAttempt(0);
    setImgLoaded(false);
    setIframeLoaded(false);
  }, [url]);

  const showIframeFallback = Boolean(url && candidates.length > 0 && thumbAttempt >= candidates.length);
  const currentThumbSrc = url && !showIframeFallback ? candidates[thumbAttempt] : undefined;

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

  const hostname = url ? safeHostname(url) : "";

  const showSkeleton = Boolean(
    url && ((!showIframeFallback && !imgLoaded && thumbAttempt < candidates.length) || (showIframeFallback && !iframeLoaded))
  );

  const previewAreaClass =
    variant === "detail"
      ? "relative min-h-[min(52vh,520px)] w-full overflow-hidden bg-muted/30 md:min-h-[440px]"
      : "relative aspect-[16/10] w-full overflow-hidden bg-muted/30";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 shadow-xl shadow-black/10",
        className
      )}
    >
      <div className="flex h-11 items-center gap-2 border-b border-border/80 px-3 sm:h-12 sm:px-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90 shadow-sm" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90 shadow-sm" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90 shadow-sm" />
        </span>
        <div className="flex min-h-9 min-w-0 flex-1 items-center rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 shadow-inner">
          <Globe className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="truncate font-mono text-[11px] text-muted-foreground sm:text-xs">{hostname || "Live site"}</span>
        </div>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary"
            aria-label={`Open ${title} live site in a new tab`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className={previewAreaClass}>
        {url && showSkeleton ? (
          <div
            className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-muted via-muted/80 to-muted"
            aria-hidden
          />
        ) : null}

        {url && currentThumbSrc && !showIframeFallback ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[2] block h-full min-h-[inherit] w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <img
              key={`${currentThumbSrc}-${thumbAttempt}`}
              src={currentThumbSrc}
              alt={`Live preview of ${title}`}
              className={cn(
                "h-full min-h-[inherit] w-full object-cover object-top transition duration-500 ease-out",
                imgLoaded ? "opacity-100" : "opacity-0",
                "hover:brightness-[1.03]"
              )}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={handleImgLoad}
              onError={handleImgError}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </a>
        ) : null}

        {url && showIframeFallback ? (
          <div className="relative z-[2] h-full min-h-[inherit] w-full">
            <iframe
              title={`Live preview of ${title}`}
              src={url}
              className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setIframeLoaded(true)}
            />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              aria-label={`Open ${title} live site in a new tab`}
            />
          </div>
        ) : null}

        {!url ? (
          <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 text-center">
            <Globe className="h-14 w-14 text-muted-foreground/35" aria-hidden />
            <p className="text-base font-medium text-foreground">No public live URL</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              This entry doesn&apos;t include a hosted link — details below still describe the build.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
