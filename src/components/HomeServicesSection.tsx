import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/serviceCatalog";
import { useLanguage } from "@/i18n/LanguageContext";

/** Compact services overview for the client view of the home page. */
const HomeServicesSection = () => {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="services" className="scroll-mt-24 py-20 relative">
      <div className="portfolio-container">
        <header className="sq-section-heading">
          <h2>{arabic ? "الخدمات." : "Services."}</h2>
          <p>{arabic ? "اختار اللي محتاجه وشوف شغل سابق شبهه." : "Pick what you need, see past work like it, then start a request."}</p>
        </header>
        <div className="service-overview">
          {services.map((service) => (
            <Link key={service.slug} to={`/services#${service.slug}`} className="glass-surface service-overview-card">
              <span><strong>{service.title}</strong><small>{service.who}</small></span>
              <ArrowRight size={18} aria-hidden />
            </Link>
          ))}
        </div>
        <Link to="/services#inquiry" className="portfolio-button">{arabic ? "ابدأ طلب" : "Start a request"}<ArrowRight size={16} aria-hidden /></Link>
      </div>
    </section>
  );
};

export default HomeServicesSection;
