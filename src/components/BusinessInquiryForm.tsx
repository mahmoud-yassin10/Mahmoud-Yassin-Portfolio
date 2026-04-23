import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Briefcase, Clipboard, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitWeb3Forms } from "@/lib/web3forms";
import { getProjectBySlug } from "@/data/projects";

type PrimaryNeed = "website" | "kashier" | "both" | "unsure" | "";

type InquiryState = {
  /** Industry / business category (5 presets + other) */
  businessType: string;
  businessTypeOther: string;
  primaryNeed: PrimaryNeed;
  /** Website branch */
  websiteSiteType: string;
  websiteScope: string;
  /** Kashier branch */
  kashierFocus: string;
  /** Both branch */
  bothStartingPoint: string;
  /** Unsure branch */
  consultFocus: string;
  /** Shared */
  projectStage: string;
  timeline: string;
  timelineFlexibleNote: string;
  paymentMethods: string[];
  company: string;
  phoneCountryCode: string;
  phoneNational: string;
  instagram: string;
  name: string;
  email: string;
  details: string;
};

const initialState: InquiryState = {
  businessType: "",
  businessTypeOther: "",
  primaryNeed: "",
  websiteSiteType: "",
  websiteScope: "",
  kashierFocus: "",
  bothStartingPoint: "",
  consultFocus: "",
  projectStage: "",
  timeline: "",
  timelineFlexibleNote: "",
  paymentMethods: [],
  company: "",
  phoneCountryCode: "+20",
  phoneNational: "",
  instagram: "",
  name: "",
  email: "",
  details: ""
};

const businessTypeOptions = [
  { value: "retail-ecommerce", label: "Retail & e-commerce (shop, catalog, online sales)" },
  { value: "food-hospitality", label: "Food, beverage, or hospitality" },
  { value: "professional", label: "Professional services (consulting, agency, finance, legal)" },
  { value: "education", label: "Education, training, or tutoring" },
  { value: "health-wellness", label: "Health, beauty, or wellness" },
  { value: "other", label: "Other — describe below" }
];

const primaryNeedOptions = [
  { value: "website", label: "Website only — marketing site, landing page, or web app" },
  { value: "kashier", label: "Kashier only — POS, payment links, terminals, catalog" },
  {
    value: "both",
    label: "Website + Kashier — web presence aligned with Kashier checkout and payments"
  },
  { value: "unsure", label: "Not sure yet — quick consult first" }
] as const;

const websiteSiteTypeOptions = [
  { value: "marketing", label: "Marketing / company website" },
  { value: "landing", label: "Landing page or campaign page" },
  { value: "webapp", label: "Small web app or internal tool" },
  { value: "catalog", label: "Catalog-style site (products & story, checkout can come later)" }
];

const websiteScopeOptions = [
  { value: "single", label: "Single page" },
  { value: "small", label: "Small site (about 2–5 pages)" },
  { value: "larger", label: "Larger site or ongoing sections" }
];

const kashierFocusOptions = [
  { value: "new-setup", label: "New Kashier setup & onboarding" },
  { value: "optimize", label: "Already on Kashier — tuning, integrations, or training" },
  { value: "payment-links", label: "Payment links / online collections focus" },
  { value: "migrate", label: "Moving from another POS or payment setup" }
];

const bothStartingPointOptions = [
  { value: "site-first", label: "Website first — then Kashier alignment" },
  { value: "kashier-first", label: "Kashier first — then web experience" },
  { value: "parallel", label: "Parallel — coordinated launch plan" }
];

const consultFocusOptions = [
  { value: "web", label: "Mostly websites / UX" },
  { value: "payments", label: "Mostly payments / Kashier" },
  { value: "combo", label: "How web + Kashier could work together" },
  { value: "open", label: "Open agenda — surprise me on the call" }
];

const projectStageOptions = [
  { value: "exploring", label: "Exploring options" },
  { value: "planning", label: "Planning / scoping requirements" },
  { value: "ready", label: "Ready to start" },
  { value: "live", label: "Already live — improvements or new features" }
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2mo", label: "Within 1–2 months" },
  { value: "2-6mo", label: "2–6 months" },
  { value: "flexible", label: "Flexible" }
];

const paymentOptionDefs = [
  { id: "cod", label: "Cash on delivery (COD)" },
  { id: "instapay", label: "InstaPay" },
  { id: "onsite", label: "Payment on website / online checkout" }
] as const;

type PhoneCountryOption = { value: string; label: string; iso: string };

/** Unicode flags often render as two letters (EG, US) on Windows — use PNGs with emoji fallback. */
function isoToFlagEmoji(iso: string): string {
  const upper = iso.toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "";
  const base = 0x1f1e6 - 65;
  return String.fromCodePoint(base + upper.charCodeAt(0)) + String.fromCodePoint(base + upper.charCodeAt(1));
}

function CountryFlagVisual({ iso }: { iso: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const lower = iso.toLowerCase();

  if (imgFailed || !/^[a-z]{2}$/i.test(iso)) {
    return (
      <span
        className="inline-flex h-5 w-6 shrink-0 items-center justify-center text-lg leading-none"
        style={{ fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif' }}
        aria-hidden
      >
        {isoToFlagEmoji(iso)}
      </span>
    );
  }

  return (
    <span className="relative mr-0.5 inline-flex h-[18px] w-[26px] shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-border/50 sm:h-5 sm:w-[28px]">
      <img
        src={`https://flagcdn.com/w40/${lower}.png`}
        srcSet={`https://flagcdn.com/w80/${lower}.png 2x`}
        width={22}
        height={15}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
      />
    </span>
  );
}

/** Dial codes for the phone field — value is stored without spaces (e.g. "+20"); `iso` picks the flag. */
const PHONE_COUNTRY_CODES: PhoneCountryOption[] = [
  { value: "+20", label: "Egypt +20", iso: "EG" },
  { value: "+1", label: "US / CA +1", iso: "US" },
  { value: "+44", label: "UK +44", iso: "GB" },
  { value: "+971", label: "UAE +971", iso: "AE" },
  { value: "+966", label: "Saudi Arabia +966", iso: "SA" },
  { value: "+965", label: "Kuwait +965", iso: "KW" },
  { value: "+974", label: "Qatar +974", iso: "QA" },
  { value: "+973", label: "Bahrain +973", iso: "BH" },
  { value: "+968", label: "Oman +968", iso: "OM" },
  { value: "+962", label: "Jordan +962", iso: "JO" },
  { value: "+961", label: "Lebanon +961", iso: "LB" },
  { value: "+90", label: "Turkey +90", iso: "TR" },
  { value: "+33", label: "France +33", iso: "FR" },
  { value: "+49", label: "Germany +49", iso: "DE" },
  { value: "+39", label: "Italy +39", iso: "IT" },
  { value: "+34", label: "Spain +34", iso: "ES" },
  { value: "+31", label: "Netherlands +31", iso: "NL" },
  { value: "+32", label: "Belgium +32", iso: "BE" },
  { value: "+41", label: "Switzerland +41", iso: "CH" },
  { value: "+46", label: "Sweden +46", iso: "SE" },
  { value: "+45", label: "Denmark +45", iso: "DK" },
  { value: "+47", label: "Norway +47", iso: "NO" },
  { value: "+358", label: "Finland +358", iso: "FI" },
  { value: "+213", label: "Algeria +213", iso: "DZ" },
  { value: "+216", label: "Tunisia +216", iso: "TN" },
  { value: "+212", label: "Morocco +212", iso: "MA" },
  { value: "+249", label: "Sudan +249", iso: "SD" },
  { value: "+254", label: "Kenya +254", iso: "KE" },
  { value: "+234", label: "Nigeria +234", iso: "NG" },
  { value: "+27", label: "South Africa +27", iso: "ZA" },
  { value: "+91", label: "India +91", iso: "IN" },
  { value: "+92", label: "Pakistan +92", iso: "PK" },
  { value: "+86", label: "China +86", iso: "CN" },
  { value: "+81", label: "Japan +81", iso: "JP" },
  { value: "+82", label: "South Korea +82", iso: "KR" },
  { value: "+65", label: "Singapore +65", iso: "SG" },
  { value: "+60", label: "Malaysia +60", iso: "MY" },
  { value: "+61", label: "Australia +61", iso: "AU" },
  { value: "+64", label: "New Zealand +64", iso: "NZ" }
];

function nationalPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function buildMessageBody(
  data: InquiryState,
  resolved: {
    primaryLabel: string;
    branchBlock: string;
    stageLabel: string;
    timeLabel: string;
    paymentSummary: string;
  }
): string {
  const businessLine =
    data.businessType === "other"
      ? `Other (describe): ${data.businessTypeOther.trim() || "(empty)"}`
      : data.businessType
        ? labelFor(businessTypeOptions, data.businessType)
        : "(not selected)";

  const lines = [
    "--- Business inquiry (Services) ---",
    "",
    "Your business / industry:",
    businessLine,
    "",
    "Primary focus:",
    resolved.primaryLabel,
    "",
    resolved.branchBlock,
    "",
    "Where is the project today?",
    resolved.stageLabel,
    "",
    "Timeline:",
    resolved.timeLabel,
    ...(data.timeline === "flexible" && data.timelineFlexibleNote.trim()
      ? ["Flexible timing note:", data.timelineFlexibleNote.trim(), ""]
      : []),
    "",
    "Payment methods selected:",
    resolved.paymentSummary,
    "",
    "--- Contact ---",
    `Company / brand: ${data.company.trim()}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phoneCountryCode} ${data.phoneNational.trim()}`,
    `Instagram: ${data.instagram.trim() || "(not provided)"}`,
    "",
    "Additional details:",
    data.details || "(none)"
  ];
  return lines.join("\n");
}

function branchSectionFromState(data: InquiryState): string {
  const need = data.primaryNeed;
  if (!need) return "(not answered)";

  if (need === "website") {
    return [
      "[Website]",
      `Type: ${labelFor(websiteSiteTypeOptions, data.websiteSiteType)}`,
      `Scope: ${labelFor(websiteScopeOptions, data.websiteScope)}`
    ].join("\n");
  }
  if (need === "kashier") {
    return ["[Kashier]", `Focus: ${labelFor(kashierFocusOptions, data.kashierFocus)}`].join("\n");
  }
  if (need === "both") {
    return ["[Website + Kashier]", `Starting point: ${labelFor(bothStartingPointOptions, data.bothStartingPoint)}`].join(
      "\n"
    );
  }
  return ["[Consult]", `Discussion focus: ${labelFor(consultFocusOptions, data.consultFocus)}`].join("\n");
}

type FirstError = { id: string; message: string };

/** DOM order used to scroll to the first invalid field after a failed submit. */
const VALIDATION_SCROLL_ORDER = [
  "fieldset-business-type",
  "business-type-other",
  "fieldset-need",
  "fieldset-web-type",
  "fieldset-web-scope",
  "fieldset-kashier-focus",
  "fieldset-both-start",
  "fieldset-consult",
  "fieldset-stage",
  "fieldset-timeline",
  "timeline-flex-note",
  "fieldset-payment",
  "biz-company",
  "biz-phone",
  "biz-name",
  "biz-email"
] as const;

function emailLooksValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** All applicable error messages — used to highlight every missing required answer at once. */
function getValidationErrors(data: InquiryState, paymentRequiredFlag: boolean): Record<string, string> {
  const e: Record<string, string> = {};

  if (!data.businessType) {
    e["fieldset-business-type"] = "Select what best describes your business.";
  }
  if (data.businessType === "other") {
    if (!data.businessTypeOther.trim()) {
      e["business-type-other"] = "Briefly describe your type of business.";
    } else if (data.businessTypeOther.trim().length < 2) {
      e["business-type-other"] = "Add a bit more detail (at least 2 characters).";
    }
  }

  if (!data.primaryNeed) {
    e["fieldset-need"] = "Select what you are building.";
  }

  if (data.primaryNeed === "website") {
    if (!data.websiteSiteType) e["fieldset-web-type"] = "Choose a website type.";
    if (!data.websiteScope) e["fieldset-web-scope"] = "Choose an approximate scope.";
  }
  if (data.primaryNeed === "kashier" && !data.kashierFocus) {
    e["fieldset-kashier-focus"] = "Select what you need from Kashier.";
  }
  if (data.primaryNeed === "both" && !data.bothStartingPoint) {
    e["fieldset-both-start"] = "Choose where you want to start.";
  }
  if (data.primaryNeed === "unsure" && !data.consultFocus) {
    e["fieldset-consult"] = "Select a focus for the consult.";
  }

  if (!data.projectStage) e["fieldset-stage"] = "Select where the project is today.";
  if (!data.timeline) e["fieldset-timeline"] = "Select when you want to move forward.";
  if (data.timeline === "flexible" && !data.timelineFlexibleNote.trim()) {
    e["timeline-flex-note"] = "Describe what flexible timing means for you.";
  }

  if (paymentRequiredFlag && data.paymentMethods.length === 0) {
    e["fieldset-payment"] = "Select at least one payment method.";
  }

  if (!data.company.trim()) {
    e["biz-company"] = "Enter your company or brand name.";
  }

  const phoneDigits = nationalPhoneDigits(data.phoneNational);
  if (!data.phoneNational.trim()) {
    e["biz-phone"] = "Enter your phone number.";
  } else if (phoneDigits.length < 6) {
    e["biz-phone"] = "Enter a valid phone number (include area code if applicable).";
  }

  if (!data.name.trim()) e["biz-name"] = "Enter your name.";
  else if (data.name.trim().length < 2) e["biz-name"] = "Name must be at least 2 characters.";

  if (!data.email.trim()) e["biz-email"] = "Enter your work email.";
  else if (!emailLooksValid(data.email)) e["biz-email"] = "Enter a valid email address.";

  return e;
}

function firstValidationError(errors: Record<string, string>): FirstError | null {
  for (const id of VALIDATION_SCROLL_ORDER) {
    if (errors[id]) return { id, message: errors[id] };
  }
  const rest = Object.entries(errors)[0];
  return rest ? { id: rest[0], message: rest[1] } : null;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
}

const McqBlock = ({
  title,
  required: isRequired,
  value,
  onChange,
  options,
  name,
  fieldsetId,
  showError,
  errorMessage
}: {
  title: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  name: string;
  fieldsetId?: string;
  showError?: boolean;
  errorMessage?: string;
}) => (
  <fieldset
    id={fieldsetId}
    className={cn(
      "space-y-3 rounded-xl border bg-card/30 p-4",
      showError ? "border-destructive border-2" : "border-border"
    )}
    aria-invalid={showError ? true : undefined}
  >
    <legend className="px-1 text-sm font-medium text-foreground">
      {title}
      {isRequired ? <span className="text-destructive"> *</span> : null}
    </legend>
    {showError && errorMessage ? (
      <p className="text-sm text-destructive" role="alert">
        {errorMessage}
      </p>
    ) : null}
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
  const [searchParams] = useSearchParams();
  const similarPrefilledRef = useRef(false);

  const [data, setData] = useState<InquiryState>(initialState);
  const [botField, setBotField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  const { toast } = useToast();

  useEffect(() => {
    if (similarPrefilledRef.current) return;
    const slug = searchParams.get("similar");
    if (!slug) return;
    const refProject = getProjectBySlug(slug);
    if (!refProject) return;
    similarPrefilledRef.current = true;
    setData((prev) => {
      if (prev.details.trim()) return prev;
      const site = refProject.externalLink?.trim();
      const prefix = site
        ? `Reference project: "${refProject.title}" — ${site}\n\n`
        : `Reference project: "${refProject.title}"\n\n`;
      return { ...prev, details: prefix };
    });
  }, [searchParams]);

  const showPaymentMulti = data.primaryNeed !== "";
  const paymentRequired = data.primaryNeed === "kashier" || data.primaryNeed === "both";

  const fieldErrors =
    validationAttempted ? getValidationErrors(data, paymentRequired) : ({} as Record<string, string>);

  const togglePayment = (id: string, checked: boolean) => {
    setData((prev) => ({
      ...prev,
      paymentMethods: checked
        ? [...prev.paymentMethods, id]
        : prev.paymentMethods.filter((p) => p !== id)
    }));
  };

  const setPrimaryNeed = (v: string) => {
    setData((prev) => ({
      ...initialState,
      primaryNeed: v as PrimaryNeed,
      businessType: prev.businessType,
      businessTypeOther: prev.businessTypeOther,
      company: prev.company,
      phoneCountryCode: prev.phoneCountryCode,
      phoneNational: prev.phoneNational,
      instagram: prev.instagram,
      name: prev.name,
      email: prev.email,
      details: prev.details
    }));
  };

  const handleCopyPhone = async () => {
    const national = data.phoneNational.trim();
    if (!national) {
      toast({
        title: "Nothing to copy",
        description: "Enter your phone number first.",
        variant: "destructive"
      });
      return;
    }
    const full = `${data.phoneCountryCode} ${national}`.trim();
    try {
      await navigator.clipboard.writeText(full);
      toast({
        title: "Copied",
        description: "Phone number copied to clipboard."
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy. Please try manually.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return;

    const errs = getValidationErrors(data, paymentRequired);
    if (Object.keys(errs).length > 0) {
      setValidationAttempted(true);
      const first = firstValidationError(errs);
      toast({
        title: "Complete required fields",
        description: first?.message ?? "Review the sections marked below.",
        variant: "destructive"
      });
      if (first) scrollToId(first.id);
      return;
    }

    if (!accessKey) {
      toast({
        title: "Form not configured",
        description: "The inquiry form cannot send email until the site key is configured.",
        variant: "destructive"
      });
      return;
    }

    const primaryLabel =
      primaryNeedOptions.find((o) => o.value === data.primaryNeed)?.label ?? data.primaryNeed;
    const stageLabel = labelFor(projectStageOptions, data.projectStage);
    const timeLabel = labelFor(timelineOptions, data.timeline);
    const branchBlock = branchSectionFromState(data);

    const paymentLabels = paymentOptionDefs
      .filter((p) => data.paymentMethods.includes(p.id))
      .map((p) => p.label);
    const paymentSummary =
      paymentLabels.length > 0 ? paymentLabels.join(", ") : "(none selected — optional for this flow)";

    const body = buildMessageBody(data, {
      primaryLabel,
      branchBlock,
      stageLabel,
      timeLabel,
      paymentSummary
    });

    try {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("subject", "[Services] Business inquiry");
      payload.append(
        "business_type",
        data.businessType === "other"
          ? `other: ${data.businessTypeOther.trim()}`
          : labelFor(businessTypeOptions, data.businessType)
      );
      if (data.businessType === "other") {
        payload.append("business_type_other", data.businessTypeOther.trim());
      }
      payload.append("name", data.name.trim());
      payload.append("email", data.email.trim());
      payload.append("message", body);
      payload.append("botcheck", botField);
      payload.append("company", data.company.trim());
      payload.append("phone", `${data.phoneCountryCode} ${data.phoneNational.trim()}`);
      payload.append("phone_country_code", data.phoneCountryCode);
      payload.append("instagram", data.instagram.trim());
      payload.append("primary_need", primaryLabel);
      payload.append("project_stage", stageLabel);
      payload.append("timeline", timeLabel);
      payload.append("timeline_flexible_note", data.timelineFlexibleNote.trim());
      payload.append("branch_detail", branchBlock);
      payload.append("payment_methods", paymentSummary);

      const refSlug = searchParams.get("similar");
      if (refSlug) {
        payload.append("reference_project_slug", refSlug);
        const rp = getProjectBySlug(refSlug);
        if (rp) {
          payload.append("reference_project_title", rp.title);
          if (rp.externalLink?.trim()) payload.append("reference_site", rp.externalLink.trim());
        }
      }

      const result = await submitWeb3Forms(payload);
      if (result.success) {
        toast({
          title: "Request sent",
          description: "Thanks — you'll hear back at the email you provided."
        });
        setValidationAttempted(false);
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
      <p className="text-muted-foreground mb-2">
        Pick your focus first — the questions adjust for websites, Kashier-only, or both together. Then share your details
        and timeline.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        <span className="text-destructive font-medium">*</span> Required fields must be completed before you can send the
        request.
      </p>

      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Briefcase className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-medium text-foreground">Want to see previous work first?</p>
            <p className="text-sm text-muted-foreground">
              Browse the Work page for live client deliveries and deeper case studies before you submit a request.
            </p>
          </div>
        </div>
        <Button asChild variant="secondary" className="shrink-0 border border-primary/30 w-full sm:w-auto">
          <Link to="/work">View previous work</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

        <McqBlock
          title="What best describes your business?"
          required
          name="business-type"
          fieldsetId="fieldset-business-type"
          value={data.businessType}
          onChange={(v) =>
            setData({
              ...data,
              businessType: v,
              businessTypeOther: v === "other" ? data.businessTypeOther : ""
            })
          }
          options={businessTypeOptions}
          showError={Boolean(fieldErrors["fieldset-business-type"])}
          errorMessage={fieldErrors["fieldset-business-type"]}
        />

        {data.businessType === "other" && (
          <div
            className={cn(
              "space-y-2 rounded-xl border bg-card/30 p-4",
              fieldErrors["business-type-other"] ? "border-destructive border-2" : "border-border"
            )}
          >
            <Label htmlFor="business-type-other">
              Describe your business <span className="text-destructive">*</span>
            </Label>
            {fieldErrors["business-type-other"] ? (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors["business-type-other"]}
              </p>
            ) : null}
            <Input
              id="business-type-other"
              value={data.businessTypeOther}
              onChange={(e) => setData({ ...data, businessTypeOther: e.target.value })}
              placeholder="e.g. logistics, nonprofit, manufacturing, SaaS…"
              className={cn(fieldErrors["business-type-other"] ? "border-destructive ring-2 ring-destructive/25" : "")}
              aria-invalid={Boolean(fieldErrors["business-type-other"])}
              aria-required
              autoComplete="organization-title"
            />
          </div>
        )}

        <McqBlock
          title="What are we building?"
          required
          name="need"
          fieldsetId="fieldset-need"
          value={data.primaryNeed}
          onChange={setPrimaryNeed}
          options={[...primaryNeedOptions]}
          showError={Boolean(fieldErrors["fieldset-need"])}
          errorMessage={fieldErrors["fieldset-need"]}
        />

        {data.primaryNeed === "website" && (
          <>
            <McqBlock
              title="Website — what type?"
              required
              name="web-type"
              fieldsetId="fieldset-web-type"
              value={data.websiteSiteType}
              onChange={(v) => setData({ ...data, websiteSiteType: v })}
              options={websiteSiteTypeOptions}
              showError={Boolean(fieldErrors["fieldset-web-type"])}
              errorMessage={fieldErrors["fieldset-web-type"]}
            />
            <McqBlock
              title="Website — rough scope?"
              required
              name="web-scope"
              fieldsetId="fieldset-web-scope"
              value={data.websiteScope}
              onChange={(v) => setData({ ...data, websiteScope: v })}
              options={websiteScopeOptions}
              showError={Boolean(fieldErrors["fieldset-web-scope"])}
              errorMessage={fieldErrors["fieldset-web-scope"]}
            />
          </>
        )}

        {data.primaryNeed === "kashier" && (
          <McqBlock
            title="Kashier — what do you need most?"
            required
            name="kashier-focus"
            fieldsetId="fieldset-kashier-focus"
            value={data.kashierFocus}
            onChange={(v) => setData({ ...data, kashierFocus: v })}
            options={kashierFocusOptions}
            showError={Boolean(fieldErrors["fieldset-kashier-focus"])}
            errorMessage={fieldErrors["fieldset-kashier-focus"]}
          />
        )}

        {data.primaryNeed === "both" && (
          <McqBlock
            title="Website + Kashier — where should we start?"
            required
            name="both-start"
            fieldsetId="fieldset-both-start"
            value={data.bothStartingPoint}
            onChange={(v) => setData({ ...data, bothStartingPoint: v })}
            options={bothStartingPointOptions}
            showError={Boolean(fieldErrors["fieldset-both-start"])}
            errorMessage={fieldErrors["fieldset-both-start"]}
          />
        )}

        {data.primaryNeed === "unsure" && (
          <McqBlock
            title="Consult — what should we focus on first?"
            required
            name="consult"
            fieldsetId="fieldset-consult"
            value={data.consultFocus}
            onChange={(v) => setData({ ...data, consultFocus: v })}
            options={consultFocusOptions}
            showError={Boolean(fieldErrors["fieldset-consult"])}
            errorMessage={fieldErrors["fieldset-consult"]}
          />
        )}

        <McqBlock
          title="Where is the project today?"
          required
          name="stage"
          fieldsetId="fieldset-stage"
          value={data.projectStage}
          onChange={(v) => setData({ ...data, projectStage: v })}
          options={projectStageOptions}
          showError={Boolean(fieldErrors["fieldset-stage"])}
          errorMessage={fieldErrors["fieldset-stage"]}
        />

        <fieldset
          id="fieldset-timeline"
          className={cn(
            "space-y-3 rounded-xl border bg-card/30 p-4",
            fieldErrors["fieldset-timeline"] ? "border-destructive border-2" : "border-border"
          )}
        >
          <legend className="px-1 text-sm font-medium text-foreground">
            When do you want to move forward?<span className="text-destructive"> *</span>
          </legend>
          {fieldErrors["fieldset-timeline"] ? (
            <p className="text-sm text-destructive" role="alert">
              {fieldErrors["fieldset-timeline"]}
            </p>
          ) : null}
          <RadioGroup
            value={data.timeline}
            onValueChange={(v) =>
              setData({
                ...data,
                timeline: v,
                timelineFlexibleNote: v === "flexible" ? data.timelineFlexibleNote : ""
              })
            }
            className="gap-3"
          >
            {timelineOptions.map((opt) => (
              <div key={opt.value} className="flex items-start gap-3">
                <RadioGroupItem value={opt.value} id={`time-${opt.value}`} className="mt-1" />
                <Label htmlFor={`time-${opt.value}`} className="font-normal leading-snug cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {data.timeline === "flexible" && (
            <div
              className={cn(
                "pt-4 mt-4 border-t border-border space-y-2",
                fieldErrors["timeline-flex-note"] && "rounded-lg border border-destructive bg-destructive/5 p-3"
              )}
            >
              <Label htmlFor="timeline-flex-note">
                Describe what &quot;flexible&quot; looks like for you<span className="text-destructive"> *</span>
              </Label>
              {fieldErrors["timeline-flex-note"] ? (
                <p className="text-sm text-destructive mt-1" role="alert">
                  {fieldErrors["timeline-flex-note"]}
                </p>
              ) : null}
              <Textarea
                id="timeline-flex-note"
                value={data.timelineFlexibleNote}
                onChange={(e) => setData({ ...data, timelineFlexibleNote: e.target.value })}
                placeholder="Example: aiming for next quarter once budget is approved; open to phased delivery…"
                rows={3}
                className={cn(
                  "mt-2",
                  fieldErrors["timeline-flex-note"] ? "border-destructive ring-2 ring-destructive/25" : ""
                )}
                aria-invalid={Boolean(fieldErrors["timeline-flex-note"])}
                aria-required
              />
            </div>
          )}
        </fieldset>

        {showPaymentMulti && (
          <fieldset
            id="fieldset-payment"
            className={cn(
              "space-y-4 rounded-xl border bg-card/30 p-4",
              fieldErrors["fieldset-payment"] ? "border-destructive border-2" : "border-border"
            )}
          >
            <legend className="px-1 text-sm font-medium text-foreground">
              Payment methods{" "}
              {paymentRequired ? (
                <span className="text-destructive">*</span>
              ) : (
                <span className="text-muted-foreground font-normal">(optional)</span>
              )}
            </legend>
            {fieldErrors["fieldset-payment"] ? (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors["fieldset-payment"]}
              </p>
            ) : null}
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-accent pl-3">
              Select <strong className="text-foreground font-medium">every</strong> option your customers use or that you want
              to offer — check all that apply.
            </p>
            <div className="space-y-3">
              {paymentOptionDefs.map((p) => (
                <div key={p.id} className="flex items-start gap-3 rounded-lg bg-background/40 p-3">
                  <Checkbox
                    id={`pay-${p.id}`}
                    checked={data.paymentMethods.includes(p.id)}
                    onCheckedChange={(c) => togglePayment(p.id, c === true)}
                    className="mt-1"
                  />
                  <Label htmlFor={`pay-${p.id}`} className="font-medium cursor-pointer leading-snug">
                    {p.label}
                  </Label>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="biz-company">
              Company / brand <span className="text-destructive">*</span>
            </Label>
            {fieldErrors["biz-company"] ? (
              <p className="text-sm text-destructive mt-1" role="alert">
                {fieldErrors["biz-company"]}
              </p>
            ) : null}
            <Input
              id="biz-company"
              autoComplete="organization"
              value={data.company}
              onChange={(e) => setData({ ...data, company: e.target.value })}
              placeholder="Business name"
              className={cn(
                "mt-1.5",
                fieldErrors["biz-company"] ? "border-destructive ring-2 ring-destructive/25" : ""
              )}
              aria-invalid={Boolean(fieldErrors["biz-company"])}
              aria-required
            />
          </div>
          <div id="biz-phone">
            <Label htmlFor="biz-phone-national">
              Phone <span className="text-destructive">*</span>
            </Label>
            {fieldErrors["biz-phone"] ? (
              <p className="text-sm text-destructive mt-1" role="alert">
                {fieldErrors["biz-phone"]}
              </p>
            ) : null}
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex min-w-0 flex-1 gap-2">
              <Select
                value={data.phoneCountryCode}
                onValueChange={(v) => setData({ ...data, phoneCountryCode: v })}
              >
                <SelectTrigger
                  id="biz-phone-cc"
                  className={cn(
                    "h-9 min-w-[10rem] shrink-0 justify-between gap-2 px-2.5 py-1 text-xs md:min-w-[11rem]",
                    "[&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0",
                    fieldErrors["biz-phone"] ? "border-destructive ring-2 ring-destructive/25" : ""
                  )}
                  aria-invalid={Boolean(fieldErrors["biz-phone"])}
                  aria-label="Country calling code"
                >
                  <SelectValue placeholder="Code">
                    {(() => {
                      const sel = PHONE_COUNTRY_CODES.find((o) => o.value === data.phoneCountryCode);
                      if (!sel) {
                        return (
                          <span className="flex min-w-0 flex-1 items-center truncate text-left">{data.phoneCountryCode}</span>
                        );
                      }
                      return (
                        <span className="flex min-w-0 flex-1 items-center gap-2.5 text-left md:gap-3">
                          <CountryFlagVisual iso={sel.iso} />
                          <span className="min-w-0 flex-1 truncate leading-tight">{sel.label}</span>
                        </span>
                      );
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-[min(280px,50vh)]">
                  {PHONE_COUNTRY_CODES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <span className="flex items-center gap-3 py-1 pr-1">
                        <span className="shrink-0">
                          <CountryFlagVisual iso={opt.iso} />
                        </span>
                        <span className="min-w-0 flex-1 leading-snug">{opt.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="biz-phone-national"
                type="tel"
                autoComplete="tel-national"
                inputMode="tel"
                value={data.phoneNational}
                onChange={(e) => setData({ ...data, phoneNational: e.target.value })}
                placeholder="Number"
                className={cn(
                  "h-9 min-w-0 flex-1 text-sm",
                  fieldErrors["biz-phone"] ? "border-destructive ring-2 ring-destructive/25" : ""
                )}
                aria-invalid={Boolean(fieldErrors["biz-phone"])}
                aria-required
              />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 touch-manipulation rounded-full text-muted-foreground hover:text-foreground"
                onClick={handleCopyPhone}
                disabled={!data.phoneNational.trim()}
                aria-label="Copy full phone number"
                title="Copy phone number"
              >
                <Clipboard className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="biz-instagram">Instagram handle (optional)</Label>
          <Input
            id="biz-instagram"
            autoComplete="username"
            value={data.instagram}
            onChange={(e) => setData({ ...data, instagram: e.target.value })}
            placeholder="@yourbrand or username"
            className="mt-1.5"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="biz-name">
              Your name <span className="text-destructive">*</span>
            </Label>
            {fieldErrors["biz-name"] ? (
              <p className="text-sm text-destructive mt-1" role="alert">
                {fieldErrors["biz-name"]}
              </p>
            ) : null}
            <Input
              id="biz-name"
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Full name"
              className={cn(
                "mt-1.5",
                fieldErrors["biz-name"] ? "border-destructive ring-2 ring-destructive/25" : ""
              )}
              aria-invalid={Boolean(fieldErrors["biz-name"])}
              aria-required
            />
          </div>
          <div>
            <Label htmlFor="biz-email">
              Work email <span className="text-destructive">*</span>
            </Label>
            {fieldErrors["biz-email"] ? (
              <p className="text-sm text-destructive mt-1" role="alert">
                {fieldErrors["biz-email"]}
              </p>
            ) : null}
            <Input
              id="biz-email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@business.com"
              className={cn(
                "mt-1.5",
                fieldErrors["biz-email"] ? "border-destructive ring-2 ring-destructive/25" : ""
              )}
              inputMode="email"
              aria-invalid={Boolean(fieldErrors["biz-email"])}
              aria-required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="biz-details">Anything else I should know? (optional)</Label>
          <Textarea
            id="biz-details"
            value={data.details}
            onChange={(e) => setData({ ...data, details: e.target.value })}
            placeholder="Goals, links to your site or Kashier receipts, constraints…"
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
