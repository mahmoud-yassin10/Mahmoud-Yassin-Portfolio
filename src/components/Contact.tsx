import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone, Linkedin, Send, Clipboard, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { submitWeb3Forms } from "@/lib/web3forms";
import { getProjectBySlug } from "@/data/projects";
import { useAudience } from "@/context/AudienceContext";
import { useLanguage } from "@/i18n/LanguageContext";

function emailLooksValidContact(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function getContactFieldErrors(formData: { name: string; email: string; message: string }) {
  const e: Record<string, string> = {};
  if (!formData.name.trim()) e.name = "contact.errName";
  else if (formData.name.trim().length < 2) e.name = "contact.errNameShort";
  if (!formData.email.trim()) e.email = "contact.errEmail";
  else if (!emailLooksValidContact(formData.email)) e.email = "contact.errEmailInvalid";
  if (!formData.message.trim()) e.message = "contact.errMessage";
  else if (formData.message.trim().length < 10) e.message = "contact.errMessageShort";
  return e;
}

const CONTACT_FIELD_ORDER = ["name", "email", "message"] as const;

const Contact = () => {
  const { audience } = useAudience();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const similarPrefilledRef = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botField, setBotField] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  const { toast } = useToast();

  useEffect(() => {
    if (similarPrefilledRef.current) return;
    const slug = searchParams.get("similar");
    if (!slug) return;
    const refProject = getProjectBySlug(slug);
    if (!refProject) return;
    similarPrefilledRef.current = true;
    setFormData((prev) => {
      if (prev.message.trim()) return prev;
      const site = refProject.externalLink?.trim();
      const msg = site
        ? t("contact.similarWithSite", { title: refProject.title, site })
        : t("contact.similarNoSite", { title: refProject.title });
      return { ...prev, message: msg };
    });
  }, [searchParams, t]);

  const fieldErrors = validationAttempted ? getContactFieldErrors(formData) : {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot for bots
    if (botField) return;

    const errs = getContactFieldErrors(formData);
    if (Object.keys(errs).length > 0) {
      setValidationAttempted(true);
      toast({
        title: t("contact.toastIncomplete"),
        description:
          CONTACT_FIELD_ORDER.map((id) => (errs[id] ? t(errs[id]) : "")).filter(Boolean)[0] ?? t("contact.toastReview"),
        variant: "destructive"
      });
      for (const id of CONTACT_FIELD_ORDER) {
        if (errs[id]) {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
      return;
    }

    if (!accessKey) {
      toast({
        title: t("contact.toastNoKey"),
        description: t("contact.toastNoKeyDesc"),
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

      const refSlug = searchParams.get("similar");
      if (refSlug) {
        payload.append("reference_project_slug", refSlug);
        const rp = getProjectBySlug(refSlug);
        if (rp) {
          payload.append("reference_project_title", rp.title);
          if (rp.externalLink?.trim()) payload.append("reference_site", rp.externalLink.trim());
        }
      }

      const data = await submitWeb3Forms(payload);

      if (data.success) {
        toast({
          title: t("contact.toastSent"),
          description: t("contact.toastSentDesc")
        });
        setValidationAttempted(false);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      toast({
        title: t("contact.toastFail"),
        description: err instanceof Error ? err.message : t("contact.toastFailDesc"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailUser = "mahmoudyassin.dev";
  const emailDomain = "gmail.com";
  const assembledEmail = `${emailUser}@${emailDomain}`;
  const storeInstagram = import.meta.env.VITE_STORE_INSTAGRAM_HANDLE?.trim();
  const instagramUser = storeInstagram?.replace(/^@/, "") ?? "";

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phone"),
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(assembledEmail);
      toast({
        title: t("contact.copiedTitle"),
        description: t("contact.copiedDesc"),
      });
    } catch (err) {
      toast({
        title: t("contact.copyFailTitle"),
        description: t("contact.copyFailDesc"),
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {audience === "client" ? t("contact.titleClient") : audience === "admissions" ? t("contact.titleAdmissions") : t("contact.titleRecruiter")}
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-foreground">{t("contact.info")}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-border">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{t("contact.email")}</p>
                    {emailRevealed ? (
                      <a
                        href={`mailto:${assembledEmail}`}
                        className="text-foreground font-medium underline-offset-2 hover:underline"
                      >
                        {assembledEmail}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{t("contact.revealHint")}</p>
                    )}
                  </div>
                  {emailRevealed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyEmail}
                      className="rounded-full"
                      aria-label={t("contact.copyEmail")}
                      title={t("contact.copyEmailTitle")}
                    >
                      <Clipboard className="w-4 h-4" />
                    </Button>
                  )}
                  {!emailRevealed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRevealEmail}
                      className="whitespace-nowrap"
                    >
                      {t("contact.reveal")}
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

              {instagramUser ? (
                <a
                  href={`https://instagram.com/${instagramUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("contact.store")}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      @{instagramUser}
                    </p>
                  </div>
                </a>
              ) : null}
            </div>
          </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <form
              onSubmit={handleSubmit}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border space-y-6"
              noValidate
            >
              <p className="text-sm text-muted-foreground">
                <span className="text-destructive font-medium">*</span> {t("contact.requiredNote")}
              </p>
              <div className="hidden">
                <label htmlFor="website">{t("contact.honeypot")}</label>
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
                  {t("contact.name")} <span className="text-destructive">*</span>
                </label>
                {fieldErrors.name ? (
                  <p className="text-sm text-destructive mb-2" role="alert">
                    {t(fieldErrors.name)}
                  </p>
                ) : null}
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.namePh")}
                  className={cn("w-full", fieldErrors.name && "border-destructive ring-2 ring-destructive/25")}
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  {t("contact.email")} <span className="text-destructive">*</span>
                </label>
                {fieldErrors.email ? (
                  <p className="text-sm text-destructive mb-2" role="alert">
                    {t(fieldErrors.email)}
                  </p>
                ) : null}
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.emailPh")}
                  className={cn("w-full", fieldErrors.email && "border-destructive ring-2 ring-destructive/25")}
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  {t("contact.message")} <span className="text-destructive">*</span>
                </label>
                {fieldErrors.message ? (
                  <p className="text-sm text-destructive mb-2" role="alert">
                    {t(fieldErrors.message)}
                  </p>
                ) : null}
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("contact.messagePh")}
                  rows={5}
                  className={cn("w-full", fieldErrors.message && "border-destructive ring-2 ring-destructive/25")}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="me-2 h-5 w-5" />
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
