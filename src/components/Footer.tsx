import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : undefined, { year: "numeric", month: "short" });
  const storeInstagram = import.meta.env.VITE_STORE_INSTAGRAM_HANDLE?.trim();
  const instagramUser = storeInstagram?.replace(/^@/, "") ?? "";

  const footerLinks = [
    { name: t("nav.services"), to: "/services" },
    { name: t("nav.work"), to: "/work" },
    { name: t("nav.portfolio"), to: "/portfolio" },
    { name: t("nav.contact"), to: "/contact" }
  ] as const;

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MY
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {instagramUser ? (
            <div className="flex justify-center">
              <a
                href={`https://instagram.com/${instagramUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                <span>{t("footer.store", { user: instagramUser })}</span>
              </a>
            </div>
          ) : null}

          <p className="text-sm text-muted-foreground">
            {t("footer.rights", { year: currentYear })}
          </p>

          <p className="text-xs text-muted-foreground">
            {t("footer.updated", { date: lastUpdated })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
