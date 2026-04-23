import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import BusinessInquiryForm from "@/components/BusinessInquiryForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProjectTile } from "@/components/Projects";
import { Badge } from "@/components/ui/badge";
import { type ProjectTileData } from "@/data/projects";
import { getServicesInquiryHref, servicesPageOfferings } from "@/data/servicesOfferings";
import { cn } from "@/lib/utils";

const ServicesPage = () => {
  const location = useLocation();
  const servicesInquiryHref = getServicesInquiryHref();

  useEffect(() => {
    if (location.hash !== "#business-inquiry") return;
    const node = document.getElementById("business-inquiry");
    if (!node) return;
    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.pathname, location.hash]);

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
                <strong className="text-foreground font-medium">combine both</strong>. Scroll down for the full business
                inquiry questionnaire and contact options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
              {servicesPageOfferings.map((service, index) => {
                const project: ProjectTileData = {
                  title: service.title,
                  description: service.description,
                  tech: service.bullets,
                  period: "Available",
                  link: servicesInquiryHref,
                  type: "Service"
                };

                const isWebsiteFirst = index === 0;

                return (
                  <div
                    key={service.id}
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
                        buttonLabel="Request this"
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

        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
