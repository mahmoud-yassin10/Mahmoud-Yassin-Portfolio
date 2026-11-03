import AdmissionsJourney from "@/components/AdmissionsJourney";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeServicesSection from "@/components/HomeServicesSection";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import AudiencePath from "@/components/AudiencePath";
import AdmissionsStories from "@/components/AdmissionsStories";
import AdmissionsActivities from "@/components/AdmissionsActivities";
import AdmissionsHonors from "@/components/AdmissionsHonors";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";

const Home = () => {
  const location = useLocation();
  const { audience } = useAudience();
  const { t } = useLanguage();

  useEffect(() => {
    if (!location.hash) return;
    const node = document.getElementById(location.hash.slice(1));
    if (!node) return;
    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
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
            <AdmissionsStories />
            <AdmissionsJourney />
            <AdmissionsActivities />
            <AdmissionsHonors />
            <Education />
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
