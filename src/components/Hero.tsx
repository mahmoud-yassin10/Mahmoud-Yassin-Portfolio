import { Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  // Works on localhost ("/") and GitHub Pages ("/<repo>/")
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const servicesHref = `${base}/services`;
  const cvHref = `${base}/CV.pdf`;
  const githubHref = "https://github.com/mahmoud-yassin10";
  const linkedinHref = "https://linkedin.com/in/mahmoud--yassin";
  const photoSrcWebp = encodeURI(`${base}/ME-NTA.webp`);
  const photoSrcJpg = encodeURI(`${base}/ME NTA.jpg`);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10 animate-gradient-shift bg-[length:200%_200%]" />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/15 animate-gradient-shift bg-[length:200%_200%]"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 items-center gap-12 animate-fade-in-up">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Mahmoud Yassin
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
                Software Engineer & Student Founder
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Building impactful apps from Port Said, Egypt - combining AI, Flutter development, and leadership to create solutions that matter.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start items-center pt-4">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href={servicesHref}>
                  View services
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 gap-1 px-4"
                asChild
              >
                <a href={cvHref} target="_blank" rel="noreferrer">
                  <Download className="h-5 w-5" />
                  CV
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 px-3"
                asChild
              >
                <a href={githubHref} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 px-3"
                asChild
              >
                <a href={linkedinHref} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 via-accent/20 to-primary/10 blur-3xl opacity-70 animate-pulse-glow" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl bg-card/60 backdrop-blur-sm">
              <picture>
                <source srcSet={photoSrcWebp} type="image/webp" />
                <img
                  src={photoSrcJpg}
                  alt="Mahmoud Yassin portrait"
                  className="w-full h-full object-cover aspect-[1280/853]"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </section>
  );
};

export default Hero;
