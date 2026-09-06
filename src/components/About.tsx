import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { dict } = useLanguage();

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {dict.about.title}
          </h2>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border animate-fade-in">
            <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
              {dict.aboutParagraphs.map((paragraph, index) => {
                const highlight = dict.aboutHighlights[index];
                if (!highlight || !paragraph.includes(highlight)) {
                  return <p key={index}>{paragraph}</p>;
                }
                const [before, after] = paragraph.split(highlight);
                return (
                  <p key={index}>
                    {before}
                    <span className={index === 1 ? "text-accent font-semibold" : "text-primary font-semibold"}>
                      {highlight}
                    </span>
                    {after}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
