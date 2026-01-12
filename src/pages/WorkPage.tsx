import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ProjectTile } from "@/components/Projects";
import { projects, type ProjectTileData } from "@/data/projects";

type WorkTab = "client" | "projects";

const clientWork: ProjectTileData[] = [
  {
    title: "Fresheria",
    description: "A fast, modern marketing site with a clean layout and mobile-first UX for customers.",
    tech: ["Website", "Brand"],
    period: "Live",
    link: "https://fresheria.vercel.app",
    type: "Client Work"
  },
  {
    title: "Niney Yassin",
    description: "A personal website showcasing profile, achievements, and a structured portfolio presentation.",
    tech: ["Personal Site", "Portfolio"],
    period: "Live",
    link: "https://nineyyassin.com",
    type: "Client Work"
  },
  {
    title: "RevWear",
    description: "A brand storefront focused on product presentation, clear navigation, and conversion-ready pages.",
    tech: ["Ecommerce", "Storefront"],
    period: "Live",
    link: "https://revwear.store",
    type: "Client Work"
  },
  {
    title: "FemPlus Magazine",
    description: "An editorial-style magazine website designed to highlight content and brand identity.",
    tech: ["Editorial", "Magazine"],
    period: "Live",
    link: "https://femplusmag.com",
    type: "Client Work"
  }
];

const WorkPage = () => {
  const [activeTab, setActiveTab] = useState<WorkTab>("client");
  const isClientTab = activeTab === "client";
  const items = isClientTab ? clientWork : projects;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Work
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <Button
                type="button"
                variant={isClientTab ? "default" : "outline"}
                onClick={() => setActiveTab("client")}
                className="rounded-full"
              >
                Client Work
              </Button>
              <Button
                type="button"
                variant={isClientTab ? "outline" : "default"}
                onClick={() => setActiveTab("projects")}
                className="rounded-full"
              >
                Projects
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {items.map((project, index) => (
                <ProjectTile
                  key={`${activeTab}-${project.title}`}
                  project={project}
                  index={index}
                  buttonLabel={isClientTab ? "View" : undefined}
                  linkRel={isClientTab ? "noreferrer" : undefined}
                  linkTarget={isClientTab ? "_blank" : "_self"}
                  alignButton
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkPage;
