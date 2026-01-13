import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short" });

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
