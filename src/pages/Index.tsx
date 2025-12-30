import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Initiatives from "@/components/Initiatives";
import Awards from "@/components/Awards";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Initiatives />
        <Awards />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
