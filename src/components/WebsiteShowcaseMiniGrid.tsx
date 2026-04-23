import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import type { Project } from "@/data/projects";
import { clientProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

function previewImageUrl(siteUrl: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=480`;
}

function Tile({ project }: { project: Project }) {
  const liveUrl = project.externalLink?.trim();
  const [showImage, setShowImage] = useState(Boolean(liveUrl));

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group relative aspect-[5/4] overflow-hidden rounded-xl border border-border/50 bg-muted/25",
        "shadow-sm shadow-black/5 transition-all duration-300",
        "hover:border-primary/45 hover:shadow-md hover:shadow-primary/5"
      )}
      aria-label={`${project.title} — view case study`}
    >
      {liveUrl && showImage ? (
        <img
          src={previewImageUrl(liveUrl)}
          alt=""
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setShowImage(false)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-primary/10 via-muted/30 to-accent/10 p-2">
          <Globe className="h-7 w-7 text-primary/35" aria-hidden />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent pb-2 pt-10 px-1.5">
        <p className="line-clamp-2 text-center text-[10px] font-semibold leading-tight text-foreground sm:text-[11px]">
          {project.title}
        </p>
      </div>
    </Link>
  );
}

const SHOWCASE_COUNT = 6;

/** Six recent client websites — thumbnails + links to `/projects/:slug`. */
export function WebsiteShowcaseMiniGrid() {
  const items = clientProjects.slice(0, SHOWCASE_COUNT);

  return (
    <div
      className="grid grid-cols-2 gap-2 sm:gap-2.5 sm:grid-cols-3"
      aria-label="Recent website projects"
    >
      {items.map((project) => (
        <Tile key={project.slug} project={project} />
      ))}
    </div>
  );
}
