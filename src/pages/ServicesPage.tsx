import AnimatedBackground from "@/components/AnimatedBackground";
import BusinessInquiryForm from "@/components/BusinessInquiryForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProjectTile } from "@/components/Projects";
import { Badge } from "@/components/ui/badge";
import { type ProjectTileData } from "@/data/projects";
import { cn } from "@/lib/utils";

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

const ServicesPage = () => {
  const rawBase = import.meta.env.BASE_URL || "/";
  const basePath = rawBase.replace(/\/+$/, "");
  const servicesInquiryHref =
    basePath === "" ? "/services#business-inquiry" : `${basePath}/services#business-inquiry`;
  /** Website development is intentionally first (primary tile). Order is fixed for layout emphasis. */
  const services: ServiceItem[] = [
    {
      title: "Website development",
      description:
        "Marketing sites, landing pages, and lightweight web apps — fast, responsive, and ready for search and analytics. Ideal when your priority is a credible online presence and clear customer journeys.",
      bullets: ["Design-to-code implementation", "Performance & SEO fundamentals", "Analytics-ready structure", "Hosting guidance & handoff"],
      ctaLabel: "Request this",
      ctaHref: servicesInquiryHref
    },
    {
      title: "Kashier systems",
      description:
        "Payments and operations with Kashier — terminals, payment links, catalog alignment, and practical workflows so your team can sell online and in-store with confidence.",
      bullets: ["POS & payment links setup", "Products / pricing alignment", "Staff-friendly flows", "Reporting & reconciliation basics"],
      ctaLabel: "Request this",
      ctaHref: servicesInquiryHref
    },
    {
      title: "Website + Kashier together",
      description:
        "When your brand needs both: a polished site that reflects your offers and a Kashier-backed payment story — from consultation through integration planning so web and checkout stay consistent.",
      bullets: ["Unified customer journey", "Site + catalog / pricing consistency", "Online pay + in-store flows", "Integration planning & rollout support"],
      ctaLabel: "Request this",
      ctaHref: servicesInquiryHref
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Services
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I focus on{" "}
                <strong className="text-foreground font-medium">website development</strong>,{" "}
                <strong className="text-foreground font-medium">Kashier</strong> (payments and POS), and projects that{" "}
                <strong className="text-foreground font-medium">combine both</strong> so your web presence and checkout
                experience stay aligned.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
              {services.map((service, index) => {
                const project: ProjectTileData = {
                  title: service.title,
                  description: service.description,
                  tech: service.bullets,
                  period: "Available",
                  link: service.ctaHref,
                  type: "Service"
                };

                const isWebsiteFirst = index === 0;

                return (
                  <div
                    key={service.title}
                    className={cn(
                      "relative flex flex-col min-h-0",
                      isWebsiteFirst &&
                        "rounded-2xl p-[2px] bg-gradient-to-br from-primary/50 via-primary/25 to-accent/30 shadow-lg shadow-primary/10"
                    )}
                  >
                    {isWebsiteFirst ? (
                      <Badge
                        variant="secondary"
                        className="absolute -top-2.5 left-4 z-10 border border-primary/40 bg-background/95 shadow-sm"
                      >
                        Core offering
                      </Badge>
                    ) : null}
                    <div className={cn("flex flex-col flex-1 min-h-0", isWebsiteFirst && "rounded-[14px] bg-background")}>
                      <ProjectTile
                        project={project}
                        index={index}
                        buttonLabel={service.ctaLabel}
                        linkRel={undefined}
                        linkTarget="_self"
                        alignButton
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <BusinessInquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
