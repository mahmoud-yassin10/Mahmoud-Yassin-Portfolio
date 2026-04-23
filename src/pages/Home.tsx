import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeServicesSection from "@/components/HomeServicesSection";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#services") return;
    const node = document.getElementById("services");
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
        <Hero />
        <HomeServicesSection />
        <Projects limit={4} ctaHref="/work" ctaLabel="View all projects" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
