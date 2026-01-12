import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects, { ProjectTile } from "@/components/Projects";
import { type ProjectTileData } from "@/data/projects";
import { Button } from "@/components/ui/button";

const Home = () => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const servicesHref = `${base}/services`;
  const servicePreviewItems: ProjectTileData[] = [
    {
      title: "MVP Build Sprint",
      description: "From idea to a working product fast: core features, clean UI, and a deploy-ready build.",
      tech: ["MVP", "UI", "Launch"],
      period: "Available",
      link: `${base}/services`,
      type: "Service / Most requested"
    },
    {
      title: "AI / Computer Vision Prototype",
      description: "YOLO/tracking pipelines, evaluation, and a demo that proves it works in real conditions.",
      tech: ["YOLO", "Tracking", "Demo"],
      period: "Available",
      link: `${base}/services`,
      type: "Service"
    },
    {
      title: "Flutter Mobile Apps",
      description: "Cross-platform apps with clean UI, auth, and data sync.",
      tech: ["Flutter", "Firebase Auth", "Mobile"],
      period: "Available",
      link: `${base}/services`,
      type: "Service"
    },
    {
      title: "Web/App Development",
      description: "Modern responsive interfaces with performance, clean structure, and maintainable code.",
      tech: ["Web", "Mobile", "Performance"],
      period: "Available",
      link: `${base}/services`,
      type: "Service"
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Services
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Pick what you need - I'll handle the build end-to-end.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {servicePreviewItems.map((item, index) => (
                <ProjectTile
                  key={item.title}
                  project={item}
                  index={index}
                  buttonLabel="View services"
                  linkTarget="_self"
                  alignButton
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href={servicesHref} target="_self" rel="noopener noreferrer">
                  Explore all services
                </a>
              </Button>
            </div>
          </div>
        </section>
        <Projects limit={4} ctaHref="/work" ctaLabel="View all projects" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
