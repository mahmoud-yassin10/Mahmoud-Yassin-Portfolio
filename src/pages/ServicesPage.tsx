import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProjectTile } from "@/components/Projects";
import { type ProjectTileData } from "@/data/projects";

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

const ServicesPage = () => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const services: ServiceItem[] = [
    {
      title: "Product & MVP Build",
      description: "Rapid MVPs to validate ideas with real users and clear next steps.",
      bullets: ["Scope definition", "Clickable prototype", "MVP build", "User feedback loop"],
      ctaLabel: "Get started",
      ctaHref: `${base}/contact`
    },
    {
      title: "Flutter Mobile Apps",
      description: "Cross-platform apps with clean UI, auth, and data sync.",
      bullets: ["Flutter/Dart", "Firebase Auth", "Push-ready", "Store support"],
      ctaLabel: "Contact",
      ctaHref: `${base}/contact`
    },
    {
      title: "Websites & Landing Pages",
      description: "Responsive sites for brands, campaigns, and portfolios.",
      bullets: ["Design to code", "SEO basics", "Analytics setup", "Fast hosting"],
      ctaLabel: "Get started",
      ctaHref: `${base}/contact`
    },
    {
      title: "AI/CV Prototypes",
      description: "Proof-of-concept AI features for vision or NLP.",
      bullets: ["Model selection", "Data pipeline", "Inference demo", "Report + roadmap"],
      ctaLabel: "Contact",
      ctaHref: `${base}/contact`
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => {
                const project: ProjectTileData = {
                  title: service.title,
                  description: service.description,
                  tech: service.bullets,
                  period: "Available",
                  link: service.ctaHref,
                  type: "Service"
                };

                return (
                  <ProjectTile
                    key={service.title}
                    project={project}
                    index={index}
                    buttonLabel={service.ctaLabel}
                    linkRel="noreferrer"
                    alignButton
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
