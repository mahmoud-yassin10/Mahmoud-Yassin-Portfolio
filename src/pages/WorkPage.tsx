import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ClientWorkTile } from "@/components/ClientWorkTile";
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

            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
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

            {isClientTab ? (
              <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Previews try a screenshot first, then a live mini embed if needed (some hosts block thumbnails). Click the
                preview or &quot;Live site&quot; to open the real URL; use &quot;View case study&quot; for details.
              </p>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {items.map((project, index) =>
                isClientTab ? (
                  <ClientWorkTile key={project.slug} project={project} index={index} />
                ) : (
                  <ProjectTile
                    key={`${activeTab}-${project.slug}`}
                    project={project}
                    index={index}
                    alignButton
                    linkTarget="_self"
                  />
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkPage;
