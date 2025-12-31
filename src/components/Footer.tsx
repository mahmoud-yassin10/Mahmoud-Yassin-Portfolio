import { smoothScrollToId } from "@/lib/scroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short" });

  const scrollToSection = (id: string) => {
    smoothScrollToId(id, { offset: 80, duration: 700, easing: "easeInOutCubic" });
  };

  const footerLinks = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Initiatives", id: "initiatives" },
    { name: "Awards", id: "awards" },
    { name: "Education", id: "education" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
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
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </button>
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
