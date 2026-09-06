import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeServicesSection from "@/components/HomeServicesSection";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Initiatives from "@/components/Initiatives";
import Awards from "@/components/Awards";
import Skills from "@/components/Skills";
import AudiencePath from "@/components/AudiencePath";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";

const Home = () => {
  const location = useLocation();
  const { audience } = useAudience();
  const { t } = useLanguage();

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
        <AudiencePath />
        {audience === "recruiter" ? (
          <>
            <Projects limit={4} ctaHref="/work" ctaLabel={t("home.viewAllWork")} />
            <Experience />
            <Skills />
          </>
        ) : null}
        {audience === "admissions" ? (
          <>
            <About />
            <Education />
            <Initiatives />
            <Awards />
            <Projects limit={4} ctaHref="/work" ctaLabel={t("home.exploreProjects")} />
          </>
        ) : null}
        {audience === "client" ? (
          <>
            <HomeServicesSection />
            <Projects limit={4} ctaHref="/work" ctaLabel={t("home.viewSelectedWork")} />
          </>
        ) : null}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
