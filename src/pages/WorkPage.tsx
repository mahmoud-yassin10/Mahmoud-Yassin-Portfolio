import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { WorkExplorer } from "@/components/WorkSections";

const WorkPage = () => (
  <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    <AnimatedBackground /><Navbar /><main id="main-content" className="relative z-10 pt-28"><WorkExplorer standalone /></main><Footer />
  </div>
);

export default WorkPage;
