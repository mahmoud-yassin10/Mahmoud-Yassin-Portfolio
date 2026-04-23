import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const navLinks = [
    { name: "Services", to: "/services" },
    { name: "Work", to: "/work" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Contact", to: "/contact" },
  ];

  const navSurfaceActive = isScrolled || isMobileMenuOpen;

  return (
    <>
      {isMobileMenuOpen ? (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-[2px] transition-opacity duration-300 md:hidden motion-reduce:transition-none"
          aria-hidden
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navSurfaceActive
            ? "bg-background/90 backdrop-blur-lg shadow-lg border-b border-border"
            : "bg-transparent"
        }`}
        aria-label="Primary"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              MY
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={typeof link.to === "string" ? link.to : `${link.to.pathname}${link.to.hash ?? ""}`}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  aria-label={link.name === "Services" ? "Services page" : `Go to ${link.name}`}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={typeof link.to === "string" ? link.to : `${link.to.pathname}${link.to.hash ?? ""}`}
                    to={link.to}
                    className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                    aria-label={link.name === "Services" ? "Services page" : `Go to ${link.name}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
