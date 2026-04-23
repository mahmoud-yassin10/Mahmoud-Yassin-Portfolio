import { ArrowRight, Check, ClipboardList, CreditCard, Globe, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getServicesInquiryHref,
  getServicesPageHref,
  secondaryServiceOfferings,
  websiteOffering
} from "@/data/servicesOfferings";
import { WebsiteShowcaseMiniGrid } from "@/components/WebsiteShowcaseMiniGrid";
import { cn } from "@/lib/utils";

const secondaryIcons = [CreditCard, Link2, ClipboardList] as const;

const HomeServicesSection = () => {
  const inquiryHref = getServicesInquiryHref();
  const fullServicesHref = getServicesPageHref();

  return (
    <section id="services" className="scroll-mt-24 py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Website work is the core thread — Kashier and combined builds sit alongside it. Start from the featured card,
            then pick a focus below or jump straight to the detailed intake form.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured: website development */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/60 via-accent/40 to-primary/30 shadow-xl shadow-primary/10">
            <Card className="overflow-hidden rounded-[23px] border-0 bg-card/95 backdrop-blur-sm">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 p-6 md:p-10">
                <div className="flex flex-col justify-center space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-primary">
                      Core offering
                    </Badge>
                    <span className="text-sm text-muted-foreground">Most projects start here</span>
                  </div>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-accent/20 ring-1 ring-primary/30">
                    <Globe className="h-7 w-7 text-primary" aria-hidden />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {websiteOffering.title}
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {websiteOffering.description}
                  </CardDescription>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {websiteOffering.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-95 shadow-md"
                      asChild
                    >
                      <a href={inquiryHref}>
                        Request this service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/40" asChild>
                      <a href={fullServicesHref}>
                        Full form & details
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The full page includes the complete questionnaire and email intake — same flow, more room on screen.
                  </p>
                </div>
                <div
                  className={cn(
                    "relative min-h-[280px] rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 via-primary/5 to-accent/10",
                    "flex flex-col p-6 md:p-8"
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
                  <div className="relative z-[1] flex flex-1 flex-col gap-5">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent web work</p>
                      <WebsiteShowcaseMiniGrid />
                    </div>
                    <div className="border-t border-border/40 pt-4 mt-auto">
                      <p className="text-sm font-medium text-foreground leading-snug">
                        Landing pages, brand sites, light web apps — shipped with performance, accessibility, and launch
                        hygiene in mind.
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                        Prefer Kashier-first or a hybrid? Use the tiles below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Three supporting tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryServiceOfferings.map((svc, index) => {
              const Icon = secondaryIcons[index] ?? ClipboardList;
              return (
                <Card
                  key={svc.id}
                  className="flex flex-col border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/35 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CardHeader className="space-y-3 pb-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <CardTitle className="text-xl leading-snug">{svc.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{svc.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col pt-0">
                    <ul className="mb-6 flex-1 space-y-2">
                      {svc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="secondary" className="w-full border border-border/80" asChild>
                      <a href={inquiryHref}>
                        Get started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Need the full-screen intake, privacy context, or want to skim everything in one place?{" "}
            <a href={fullServicesHref} className="font-medium text-primary underline-offset-4 hover:underline">
              Open the dedicated services page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
