import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ContactPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
