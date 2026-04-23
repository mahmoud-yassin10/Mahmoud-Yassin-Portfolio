import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { submitWeb3Forms } from "@/lib/web3forms";

type InquiryState = {
  company: string;
  name: string;
  email: string;
  phone: string;
  primaryNeed: string;
  projectStage: string;
  timeline: string;
  kashierSituation: string;
  details: string;
};

const initialState: InquiryState = {
  company: "",
  name: "",
  email: "",
  phone: "",
  primaryNeed: "",
  projectStage: "",
  timeline: "",
  kashierSituation: "",
  details: ""
};

const primaryNeedOptions = [
  { value: "website", label: "Website development (marketing site, landing page, or web app)" },
  { value: "kashier", label: "Kashier — POS, payment links, and in-store / online payments" },
  { value: "both", label: "Both — website (or web app) integrated with Kashier" },
  { value: "unsure", label: "Not sure yet — I want a quick consult" }
];

const projectStageOptions = [
  { value: "exploring", label: "Exploring options" },
  { value: "planning", label: "Planning / scoping requirements" },
  { value: "ready", label: "Ready to start" },
  { value: "live", label: "Already live — need improvements or new features" }
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2mo", label: "Within 1–2 months" },
  { value: "2-6mo", label: "2–6 months" },
  { value: "flexible", label: "Flexible" }
];

const kashierSituationOptions = [
  { value: "na", label: "Not focused on payments / Kashier right now" },
  { value: "new-kashier", label: "New to Kashier — need setup & training" },
  { value: "have-kashier", label: "Already use Kashier — need site or integration help" },
  { value: "migrate", label: "Switching from another POS or payment setup" }
];

function buildMessageBody(data: InquiryState): string {
  const lines = [
    "--- Business inquiry (Services) ---",
    `Company / brand: ${data.company || "(not provided)"}`,
    `Phone: ${data.phone || "(not provided)"}`,
    "",
    "Primary need:",
    data.primaryNeed || "(not answered)",
    "",
    "Project stage:",
    data.projectStage || "(not answered)",
    "",
    "Timeline:",
    data.timeline || "(not answered)",
    "",
    "Payments / Kashier situation:",
    data.kashierSituation || "(not answered)",
    "",
    "Additional details:",
    data.details || "(none)"
  ];
  return lines.join("\n");
}

const McqBlock = ({
  title,
  required: isRequired,
  value,
  onChange,
  options,
  name
}: {
  title: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  name: string;
}) => (
  <fieldset className="space-y-3 rounded-xl border border-border bg-card/30 p-4">
    <legend className="px-1 text-sm font-medium text-foreground">
      {title}
      {isRequired ? <span className="text-destructive"> *</span> : null}
    </legend>
    <RadioGroup value={value} onValueChange={onChange} className="gap-3">
      {options.map((opt) => (
        <div key={opt.value} className="flex items-start gap-3">
          <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} className="mt-1" />
          <Label htmlFor={`${name}-${opt.value}`} className="font-normal leading-snug cursor-pointer">
            {opt.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </fieldset>
);

const BusinessInquiryForm = () => {
  const [data, setData] = useState<InquiryState>(initialState);
  const [botField, setBotField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return;

    if (!data.name?.trim() || !data.email?.trim()) {
      toast({ title: "Missing info", description: "Please add your name and email.", variant: "destructive" });
      return;
    }
    if (!data.primaryNeed || !data.projectStage || !data.timeline || !data.kashierSituation) {
      toast({ title: "Complete the questionnaire", description: "Please answer all multiple-choice sections.", variant: "destructive" });
      return;
    }
    if (!accessKey) {
      toast({
        title: "Form not configured",
        description: "Set VITE_WEB3FORMS_KEY (Web3Forms) to enable sending.",
        variant: "destructive"
      });
      return;
    }

    const primaryLabel = primaryNeedOptions.find((o) => o.value === data.primaryNeed)?.label ?? data.primaryNeed;
    const stageLabel = projectStageOptions.find((o) => o.value === data.projectStage)?.label ?? data.projectStage;
    const timeLabel = timelineOptions.find((o) => o.value === data.timeline)?.label ?? data.timeline;
    const kashierLabel = kashierSituationOptions.find((o) => o.value === data.kashierSituation)?.label ?? data.kashierSituation;

    const body = buildMessageBody({
      ...data,
      primaryNeed: primaryLabel,
      projectStage: stageLabel,
      timeline: timeLabel,
      kashierSituation: kashierLabel
    });

    try {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("subject", "[Services] Business inquiry");
      payload.append("name", data.name.trim());
      payload.append("email", data.email.trim());
      payload.append("message", body);
      payload.append("botcheck", botField);
      payload.append("company", data.company.trim());
      payload.append("phone", data.phone.trim());
      payload.append("primary_need", primaryLabel);
      payload.append("project_stage", stageLabel);
      payload.append("timeline", timeLabel);
      payload.append("kashier_situation", kashierLabel);

      const result = await submitWeb3Forms(payload);
      if (result.success) {
        toast({
          title: "Request sent",
          description: "Thanks — you'll get a response at the email you provided."
        });
        setData(initialState);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      toast({
        title: "Could not send",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="business-inquiry"
      className="max-w-3xl mx-auto scroll-mt-24 rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
    >
      <h3 className="text-2xl font-bold text-foreground mb-2">Request a project</h3>
      <p className="text-muted-foreground mb-6">
        Tell me what you need: a few multiple-choice answers plus your details. Submissions are delivered by{" "}
        <strong className="text-foreground">Web3Forms</strong> (same provider as the contact page) using your{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">VITE_WEB3FORMS_KEY</code> key.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="hidden" aria-hidden>
          <label htmlFor="biz-website-hp">Leave empty</label>
          <Input
            id="biz-website-hp"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="biz-company">Company / brand (optional)</Label>
            <Input
              id="biz-company"
              value={data.company}
              onChange={(e) => setData({ ...data, company: e.target.value })}
              placeholder="Business name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="biz-phone">Phone (optional)</Label>
            <Input
              id="biz-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+20 ..."
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="biz-name">
              Your name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="biz-name"
              required
              minLength={2}
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Full name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="biz-email">
              Work email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="biz-email"
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@business.com"
              className="mt-1.5"
              inputMode="email"
            />
          </div>
        </div>

        <McqBlock
          title="What do you need most?"
          required
          name="need"
          value={data.primaryNeed}
          onChange={(v) => setData({ ...data, primaryNeed: v })}
          options={primaryNeedOptions}
        />

        <McqBlock
          title="Where is the project today?"
          required
          name="stage"
          value={data.projectStage}
          onChange={(v) => setData({ ...data, projectStage: v })}
          options={projectStageOptions}
        />

        <McqBlock
          title="When do you want to move forward?"
          required
          name="time"
          value={data.timeline}
          onChange={(v) => setData({ ...data, timeline: v })}
          options={timelineOptions}
        />

        <McqBlock
          title="Payments & Kashier"
          required
          name="kashier"
          value={data.kashierSituation}
          onChange={(v) => setData({ ...data, kashierSituation: v })}
          options={kashierSituationOptions}
        />

        <div>
          <Label htmlFor="biz-details">Anything else we should know? (optional)</Label>
          <Textarea
            id="biz-details"
            value={data.details}
            onChange={(e) => setData({ ...data, details: e.target.value })}
            placeholder="Goals, constraints, links to your current site or store..."
            rows={4}
            className="mt-1.5"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          disabled={isSubmitting}
        >
          <Send className="mr-2 h-5 w-5" />
          {isSubmitting ? "Sending..." : "Send request"}
        </Button>
      </form>
    </div>
  );
};

export default BusinessInquiryForm;
