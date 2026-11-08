import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { commonQuestions, getService, services, type Question } from "@/data/serviceCatalog";
import { getWorkItem } from "@/data/workItems";
import { submitWeb3Forms } from "@/lib/web3forms";
import { useLanguage } from "@/i18n/LanguageContext";

type Answer = string | string[];
const OTHER = "Other";
const STEPS = ["What you need", "The details", "About you", "Review"];
const stepsAr = ["اللي محتاجه", "التفاصيل", "عنك", "مراجعة"];

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** A four-step request: pick what you need, answer detailed questions, tell me about you, review and send. */
export default function ServiceInquiryWizard() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const { toast } = useToast();
  const [params] = useSearchParams();
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [somethingElse, setSomethingElse] = useState("");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "", links: "", extra: "" });
  const [bot, setBot] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const preset = params.get("service");
    if (preset && getService(preset)) { setSelected([preset]); setStep(1); }
  }, [params]);

  const chosen = useMemo(() => selected.map((slug) => getService(slug)!).filter(Boolean), [selected]);
  const key = (scope: string, id: string) => `${scope}.${id}`;
  const getAnswer = (scope: string, id: string) => answers[key(scope, id)];
  const setAnswer = (scope: string, id: string, value: Answer) => setAnswers((prev) => ({ ...prev, [key(scope, id)]: value }));
  const toggleService = (slug: string) => setSelected((prev) => prev.includes(slug) ? prev.filter((entry) => entry !== slug) : [...prev, slug]);

  const isFilled = (question: Question, scope: string) => {
    const value = getAnswer(scope, question.id);
    if (!value || (Array.isArray(value) && value.length === 0)) return false;
    const hasOther = Array.isArray(value) ? value.includes(OTHER) : value === OTHER;
    return !hasOther || Boolean(others[key(scope, question.id)]?.trim());
  };

  const validate = (target: number) => {
    const missing: string[] = [];
    if (target === 0 && selected.length === 0 && !somethingElse.trim()) missing.push(arabic ? "اختار حاجة واحدة على الأقل" : "Pick at least one option, or describe what you need");
    if (target === 1) for (const service of chosen) for (const question of service.questions) if (question.required && !isFilled(question, service.slug)) missing.push(`${service.title}: ${question.label}`);
    if (target === 2) {
      for (const question of commonQuestions) if (question.required && !isFilled(question, "common")) missing.push(question.label);
      if (!contact.name.trim()) missing.push(arabic ? "الاسم" : "Your name");
      if (!emailOk(contact.email)) missing.push(arabic ? "إيميل صحيح" : "A valid email");
    }
    setErrors(missing);
    return missing.length === 0;
  };

  const go = (next: number) => { setStep(next); window.setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30); };
  const next = () => { if (validate(step)) go(step === 0 && chosen.length === 0 ? 2 : step + 1); };
  const back = () => { setErrors([]); go(step === 2 && chosen.length === 0 ? 0 : step - 1); };

  const render = (question: Question, scope: string) => {
    const value = getAnswer(scope, question.id);
    const k = key(scope, question.id);
    const options = question.options ? [...question.options, ...(question.other ? [OTHER] : [])] : [];
    const picked = (option: string) => (Array.isArray(value) ? value.includes(option) : value === option);
    const showOther = question.other && picked(OTHER);
    return (
      <fieldset key={k} className="q-field">
        <legend>{question.label}{question.required && <span className="q-required" aria-hidden> *</span>}</legend>
        {question.help && <p className="q-help">{question.help}</p>}
        {(question.type === "single" || question.type === "multi") && (
          <div className="q-options">
            {options.map((option) => (
              <label key={option} className={`q-option${picked(option) ? " is-picked" : ""}`}>
                <input type={question.type === "single" ? "radio" : "checkbox"} name={k} checked={picked(option)}
                  onChange={() => question.type === "single" ? setAnswer(scope, question.id, option) : setAnswer(scope, question.id, picked(option) ? (value as string[]).filter((entry) => entry !== option) : [...((value as string[]) ?? []), option])} />
                <span className="q-mark" aria-hidden>{picked(option) && <Check size={13} />}</span>{option === OTHER ? (arabic ? "غير كده" : "Other") : option}
              </label>
            ))}
          </div>
        )}
        {showOther && <input className="q-input" value={others[k] ?? ""} onChange={(event) => setOthers((prev) => ({ ...prev, [k]: event.target.value }))} placeholder={arabic ? "اكتب بإيجاز" : "Tell me briefly"} aria-label={arabic ? "غير كده" : "Other"} />}
        {question.type === "short" && <input className="q-input" value={(value as string) ?? ""} onChange={(event) => setAnswer(scope, question.id, event.target.value)} placeholder={question.placeholder} />}
        {question.type === "long" && <textarea className="q-input q-textarea" rows={4} value={(value as string) ?? ""} onChange={(event) => setAnswer(scope, question.id, event.target.value)} placeholder={question.placeholder} />}
      </fieldset>
    );
  };

  const describe = (question: Question, scope: string) => {
    const value = getAnswer(scope, question.id);
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    const parts = (Array.isArray(value) ? value : [value]).map((entry) => (entry === OTHER ? `Other: ${others[key(scope, question.id)] ?? ""}` : entry));
    return `${question.label}\n  ${parts.join("; ")}`;
  };

  const buildMessage = () => {
    const lines: string[] = [];
    lines.push(`Needs: ${chosen.map((service) => service.title).join(", ") || "(something else)"}`);
    if (somethingElse.trim()) lines.push(`Something else: ${somethingElse.trim()}`);
    for (const service of chosen) {
      lines.push("", `=== ${service.title} ===`);
      for (const question of service.questions) { const line = describe(question, service.slug); if (line) lines.push(line); }
    }
    lines.push("", "=== Project basics ===");
    for (const question of commonQuestions) { const line = describe(question, "common"); if (line) lines.push(line); }
    if (contact.company.trim()) lines.push(`Brand or company: ${contact.company.trim()}`);
    if (contact.links.trim()) lines.push(`Links: ${contact.links.trim()}`);
    if (contact.phone.trim()) lines.push(`Phone or WhatsApp: ${contact.phone.trim()}`);
    if (contact.extra.trim()) lines.push("", "Additional information:", contact.extra.trim());
    const similar = params.get("similar");
    const reference = similar ? getWorkItem(similar) : undefined;
    if (reference) lines.push("", `Reference work: ${reference.name}`);
    return lines.join("\n");
  };

  const submit = async () => {
    if (!validate(2)) { go(2); return; }
    if (!accessKey) { toast({ title: arabic ? "الإرسال مش متفعّل" : "Sending is not set up yet", description: arabic ? "ابعتلي إيميل مباشرة." : "Please email me directly for now.", variant: "destructive" }); return; }
    try {
      setSending(true);
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("subject", `[Services] ${chosen.map((service) => service.title).join(" + ") || "Request"}`);
      payload.append("name", contact.name.trim());
      payload.append("email", contact.email.trim());
      payload.append("message", buildMessage());
      payload.append("botcheck", bot);
      payload.append("phone", contact.phone.trim());
      payload.append("company", contact.company.trim());
      payload.append("budget", String(getAnswer("common", "budget") ?? ""));
      payload.append("timeline", String(getAnswer("common", "timeline") ?? ""));
      const result = await submitWeb3Forms(payload);
      if (!result.success) throw new Error(result.message || "Submission failed");
      setSent(true);
      go(3);
    } catch (error) {
      toast({ title: arabic ? "ماتبعتش" : "It did not send", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const restart = () => { setSent(false); setStep(0); setSelected([]); setAnswers({}); setOthers({}); setContact({ name: "", email: "", phone: "", company: "", links: "", extra: "" }); setSomethingElse(""); setErrors([]); };
  const labels = arabic ? stepsAr : STEPS;

  if (sent) return (
    <div id="inquiry" ref={topRef} className="inquiry glass-surface" dir={arabic ? "rtl" : "ltr"}>
      <div className="inquiry-done"><span className="inquiry-done-icon"><Check size={26} /></span><h2>{arabic ? "وصلتني. شكراً." : "Got it. Thank you."}</h2><p>{arabic ? "هقرأ كل تفصيلة وأرد عليك قريب." : "I will read every detail and reply soon."}</p><button type="button" className="portfolio-button" onClick={restart}>{arabic ? "طلب جديد" : "Send another request"}</button></div>
    </div>
  );

  return (
    <div id="inquiry" ref={topRef} className="inquiry glass-surface" dir={arabic ? "rtl" : "ltr"}>
      <span id="business-inquiry" className="section-anchor" aria-hidden />
      <header className="inquiry-head">
        <p className="inquiry-kicker">{arabic ? "ابدأ طلب" : "Start a request"}</p>
        <h2>{arabic ? "قولي إيه اللي محتاجه." : "Tell me what you need."}</h2>
        <ol className="inquiry-steps">{labels.map((label, index) => <li key={label} className={index === step ? "is-current" : index < step ? "is-done" : undefined}><span>{index < step ? <Check size={13} /> : index + 1}</span>{label}</li>)}</ol>
      </header>

      {step === 0 && (
        <div className="inquiry-body">
          <h3>{arabic ? "إنت مين، وإيه اللي محتاجه؟" : "Who are you, and what do you need?"}</h3>
          <p className="q-help">{arabic ? "اختار أكتر من واحد لو محتاج." : "Pick as many as apply."}</p>
          <div className="service-picks">
            {services.map((service) => (
              <button key={service.slug} type="button" className={`service-pick${selected.includes(service.slug) ? " is-picked" : ""}`} aria-pressed={selected.includes(service.slug)} onClick={() => toggleService(service.slug)}>
                <span className="q-mark" aria-hidden>{selected.includes(service.slug) && <Check size={13} />}</span>
                <span><strong>{service.iam}</strong><small>{service.title}</small></span>
              </button>
            ))}
          </div>
          <label className="q-field"><span className="q-legend">{arabic ? "حاجة تانية؟" : "Something else?"}</span><input className="q-input" value={somethingElse} onChange={(event) => setSomethingElse(event.target.value)} placeholder={arabic ? "وصّفها بإيجاز" : "Describe it briefly"} /></label>
        </div>
      )}

      {step === 1 && (
        <div className="inquiry-body">
          {chosen.map((service) => (
            <section key={service.slug} className="inquiry-section">
              <h3>{service.title}</h3>
              {service.questions.map((question) => render(question, service.slug))}
            </section>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="inquiry-body">
          <section className="inquiry-section"><h3>{arabic ? "تفاصيل المشروع" : "Project basics"}</h3>{commonQuestions.map((question) => render(question, "common"))}</section>
          <section className="inquiry-section">
            <h3>{arabic ? "عنك" : "About you"}</h3>
            <div className="q-grid">
              <label className="q-field"><span className="q-legend">{arabic ? "الاسم" : "Name"}<span className="q-required"> *</span></span><input className="q-input" value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} autoComplete="name" /></label>
              <label className="q-field"><span className="q-legend">{arabic ? "الإيميل" : "Email"}<span className="q-required"> *</span></span><input className="q-input" type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} autoComplete="email" /></label>
              <label className="q-field"><span className="q-legend">{arabic ? "رقم واتساب" : "Phone or WhatsApp"}</span><input className="q-input" value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} autoComplete="tel" /></label>
              <label className="q-field"><span className="q-legend">{arabic ? "الشركة أو العلامة" : "Brand or company"}</span><input className="q-input" value={contact.company} onChange={(event) => setContact({ ...contact, company: event.target.value })} /></label>
            </div>
            <label className="q-field"><span className="q-legend">{arabic ? "روابط (موقع، إنستجرام)" : "Links (website, Instagram)"}</span><input className="q-input" value={contact.links} onChange={(event) => setContact({ ...contact, links: event.target.value })} /></label>
            <label className="q-field"><span className="q-legend">{arabic ? "أي معلومات إضافية؟" : "Anything else I should know?"}</span><textarea className="q-input q-textarea" rows={5} value={contact.extra} onChange={(event) => setContact({ ...contact, extra: event.target.value })} placeholder={arabic ? "أي حاجة تساعدني أفهمك أحسن" : "Context, constraints, ideas, deadlines, anything that helps"} /></label>
            <input type="text" value={bot} onChange={(event) => setBot(event.target.value)} tabIndex={-1} autoComplete="off" className="q-bot" aria-hidden />
          </section>
        </div>
      )}

      {step === 3 && (
        <div className="inquiry-body">
          <h3>{arabic ? "راجع قبل ما تبعت" : "Review before you send"}</h3>
          <pre className="inquiry-review">{buildMessage()}</pre>
          <p className="q-help">{arabic ? `هترد عليك على ${contact.email}.` : `I will reply to ${contact.email}.`}</p>
        </div>
      )}

      {errors.length > 0 && <div className="inquiry-errors" role="alert"><strong>{arabic ? "ناقص:" : "Still needed:"}</strong><ul>{errors.slice(0, 6).map((message) => <li key={message}>{message}</li>)}</ul></div>}

      <footer className="inquiry-nav">
        {step > 0 ? <button type="button" className="inquiry-back" onClick={back}><ArrowLeft size={16} aria-hidden />{arabic ? "رجوع" : "Back"}</button> : <span />}
        {step < 3
          ? <button type="button" className="portfolio-button" onClick={next}>{arabic ? "التالي" : "Next"}<ArrowRight size={16} aria-hidden /></button>
          : <button type="button" className="portfolio-button" onClick={submit} disabled={sending}>{sending ? (arabic ? "بيتبعت..." : "Sending...") : (arabic ? "ابعت الطلب" : "Send request")}<Send size={16} aria-hidden /></button>}
      </footer>
    </div>
  );
}
