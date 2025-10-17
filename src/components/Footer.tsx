const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MY
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mahmoud Yassin. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground">
            Built with passion using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
