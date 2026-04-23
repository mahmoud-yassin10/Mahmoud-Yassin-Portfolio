import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ProjectTile } from "@/components/Projects";
import { clientProjects, technicalProjects } from "@/data/projects";

type WorkTab = "client" | "projects";

const WorkPage = () => {
  const [activeTab, setActiveTab] = useState<WorkTab>("client");
  const isClientTab = activeTab === "client";
  const items = isClientTab ? clientProjects : technicalProjects;

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
                  key={`${activeTab}-${project.slug}`}
                  project={project}
                  index={index}
                  alignButton
                  linkTarget="_self"
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
