import { Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServicesPageHref } from "@/data/servicesOfferings";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { profile } = useAudience();
  const { t, lang } = useLanguage();
  // Works on localhost ("/") and GitHub Pages ("/<repo>/")
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const servicesPageHref = getServicesPageHref();
  const cvHref = `${base}/CV.pdf`;
  const secondaryHref = profile?.id === "admissions" ? "/work" : profile?.id === "client" ? "/contact" : cvHref;
  const githubHref = "https://github.com/mahmoud-yassin10";
  const linkedinHref = "https://linkedin.com/in/mahmoud--yassin";
  const photoSrcWebp = encodeURI(`${base}/ME-NTA.webp`);
  const photoSrcJpg = encodeURI(`${base}/ME NTA.jpg`);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 items-center gap-12 animate-fade-in-up">
          <div className="space-y-6 text-center lg:text-start">
            <div className="space-y-3">
              <p className="audience-hero-eyebrow">{profile ? t(`audience.${profile.id}.eyebrow`) : t("hero.fallbackEyebrow")}</p>
              <h1 className="text-5xl md:text-7xl font-semibold text-foreground">
                {lang === "ar" ? "محمود ياسين" : "Mahmoud Yassin"}
              </h1>
              <h2 className="text-2xl md:text-4xl font-medium text-foreground audience-hero-title">
                {profile ? t(`audience.${profile.id}.title`) : t("hero.fallbackTitle")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {profile ? t(`audience.${profile.id}.description`) : t("hero.fallbackDescription")}
              </p>
            </div>

            <div
              className="grid w-full max-w-lg grid-cols-1 gap-3 pt-4 mx-auto lg:mx-0 lg:max-w-2xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-x-4 lg:gap-y-3"
              role="group"
              aria-label={t("hero.linksAria")}
            >
              <Button
                size="lg"
                className="group relative h-12 w-full min-h-[44px] justify-center touch-manipulation overflow-hidden bg-gradient-to-r from-primary to-accent text-base shadow-md transition-all duration-300 hover:shadow-lg active:scale-[0.98] lg:h-11 lg:min-h-[44px]"
                asChild
              >
                <a href={profile?.primaryHref ?? servicesPageHref}>{profile ? t(`audience.${profile.id}.primaryCta`) : t("hero.fallbackCta")}</a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group h-12 min-h-[44px] w-full justify-center touch-manipulation gap-2 rounded-xl border-2 border-primary px-4 transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-[0.98] lg:h-11 lg:min-h-0"
                asChild
              >
                <a href={secondaryHref} target={profile?.id === "client" || profile?.id === "admissions" ? undefined : "_blank"} rel={profile?.id === "client" ? undefined : "noreferrer"}>
                  {profile?.id !== "admissions" && <Download className="h-5 w-5 shrink-0" aria-hidden />}
                  {profile ? t(`audience.${profile.id}.secondaryCta`) : t("hero.fallbackSecondary")}
                </a>
              </Button>

              <div
                className="flex shrink-0 items-center justify-center gap-2 justify-self-center rounded-2xl border border-primary/25 bg-card/50 p-1.5 backdrop-blur-sm lg:justify-self-end"
                role="group"
                aria-label={t("hero.socialAria")}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 touch-manipulation rounded-xl border-2 border-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-95 lg:h-10 lg:w-10"
                  asChild
                >
                  <a href={githubHref} target="_blank" rel="noreferrer" aria-label={t("hero.github")}>
                    <Github className="h-5 w-5" aria-hidden />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 touch-manipulation rounded-xl border-2 border-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-95 lg:h-10 lg:w-10"
                  asChild
                >
                  <a href={linkedinHref} target="_blank" rel="noreferrer" aria-label={t("hero.linkedin")}>
                    <Linkedin className="h-5 w-5" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-deep)] bg-card">
              <picture>
                <source srcSet={photoSrcWebp} type="image/webp" />
                <img
                  src={photoSrcJpg}
                  alt={t("hero.photoAlt")}
                  className="w-full h-full object-cover aspect-[1280/853]"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
