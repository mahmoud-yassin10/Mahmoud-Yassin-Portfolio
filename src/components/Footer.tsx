import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short" });
  const storeInstagram = import.meta.env.VITE_STORE_INSTAGRAM_HANDLE?.trim();
  const instagramUser = storeInstagram?.replace(/^@/, "") ?? "";

  const footerLinks = [
    { name: "Services", to: "/services" },
    { name: "Work", to: "/work" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Contact", to: "/contact" }
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MY
            </span>
          </div>
          
          {/* Navigation Links */}
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
                <span>Store @{instagramUser}</span>
              </a>
            </div>
          ) : null}
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mahmoud Yassin. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </p>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
