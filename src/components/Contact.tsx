import { useState } from "react";
import { Mail, Phone, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botField, setBotField] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot for bots
    if (botField) return;
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!accessKey) {
      toast({
        title: "Form not configured",
        description: "Please set VITE_WEB3FORMS_KEY to enable sending.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("message", formData.message);
      payload.append("botcheck", botField);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon."
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailUser = "mahmoudyassin.dev";
  const emailDomain = "gmail.com";
  const assembledEmail = `${emailUser}@${emailDomain}`;
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+20 112 214 4543",
      href: "tel:+201122144543"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/mahmoud--yassin",
      href: "https://linkedin.com/in/mahmoud--yassin"
    }
  ];

  const handleRevealEmail = () => {
    if (!emailRevealed) {
      setEmailRevealed(true);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-border">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    {emailRevealed ? (
                      <a
                        href={`mailto:${assembledEmail}`}
                        className="text-foreground font-medium underline-offset-2 hover:underline"
                      >
                        {assembledEmail}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">Click reveal to view</p>
                    )}
                  </div>
                  {!emailRevealed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRevealEmail}
                      className="whitespace-nowrap"
                    >
                      Reveal email
                    </Button>
                  )}
                </div>

                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
                    >
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border space-y-6">
              <div className="hidden">
                <label htmlFor="website">Leave this empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
