/**
 * Every service I offer, with the questions each one asks.
 * `categories` links a service to the work categories used on the Work page, so each service can show relevant past work.
 */
export type WorkCategory = "ecommerce" | "portfolio" | "business-site" | "platform" | "mobile" | "ai" | "desktop" | "research";

export const workCategoryLabels: Record<WorkCategory, { en: string; ar: string }> = {
  ecommerce: { en: "E-commerce", ar: "متاجر إلكترونية" },
  portfolio: { en: "Portfolio and brand sites", ar: "مواقع شخصية وعلامات" },
  "business-site": { en: "Business sites", ar: "مواقع أعمال" },
  platform: { en: "Web platforms", ar: "منصات ويب" },
  mobile: { en: "Mobile apps", ar: "تطبيقات موبايل" },
  ai: { en: "AI and machine learning", ar: "ذكاء اصطناعي" },
  desktop: { en: "Desktop and POS", ar: "ديسكتوب ونقاط بيع" },
  research: { en: "Research", ar: "بحث" }
};

export type Question = {
  id: string;
  label: string;
  type: "single" | "multi" | "short" | "long";
  options?: string[];
  /** Adds an "Other" option that reveals a short answer. */
  other?: boolean;
  required?: boolean;
  placeholder?: string;
  help?: string;
};

export type Service = {
  slug: string;
  /** What the visitor taps in the first step of the form. */
  iam: string;
  title: string;
  who: string;
  summary: string;
  includes: string[];
  stack: string[];
  skills: string[];
  categories: WorkCategory[];
  questions: Question[];
};

const mc = (id: string, label: string, options: string[], extra: Partial<Question> = {}): Question => ({ id, label, type: "single", options, ...extra });
const multi = (id: string, label: string, options: string[], extra: Partial<Question> = {}): Question => ({ id, label, type: "multi", options, ...extra });
const short = (id: string, label: string, extra: Partial<Question> = {}): Question => ({ id, label, type: "short", ...extra });
const long = (id: string, label: string, extra: Partial<Question> = {}): Question => ({ id, label, type: "long", ...extra });

const languages = mc("language", "Which language should it be in?", ["Arabic", "English", "Both Arabic and English"], { required: true });

export const services: Service[] = [
  {
    slug: "ecommerce", iam: "I run an e-commerce business", title: "E-commerce stores", who: "Brands that sell products online, or want to move from Instagram and WhatsApp to a real store.",
    summary: "A fast, mobile-first store with a catalog, cart, checkout and an admin portal, built around how Egyptian customers actually order and pay.",
    includes: ["Catalog with categories, search, filters and variants", "Cart, checkout, delivery details and order tracking", "WhatsApp ordering and cash-on-delivery flows", "Admin portal for products, orders, customers and settings", "Arabic and English with true right-to-left layout", "Analytics, SEO basics and a clean handoff"],
    stack: ["Next.js or React", "TypeScript", "Supabase, Firebase or Postgres", "Vercel"], skills: ["nextjs", "react", "typescript", "ecommerce", "i18n", "responsive", "vercel"], categories: ["ecommerce"],
    questions: [
      multi("sell", "What do you sell?", ["Clothing and fashion", "Food and beverages", "Books and stationery", "Beauty and personal care", "Electronics and accessories", "Handmade or crafts", "Services or bookings", "Digital products"], { other: true, required: true }),
      multi("channels", "Where do you sell today?", ["Instagram or DMs", "WhatsApp", "A physical store", "A marketplace (Noon, Jumia, Amazon)", "A Facebook page", "I am not selling yet"], { other: true }),
      mc("catalog", "How many products will you list?", ["Fewer than 20", "20 to 100", "100 to 500", "More than 500"], { required: true }),
      multi("payments", "How should customers pay?", ["Cash on delivery", "Card payments", "Mobile wallets", "InstaPay", "Bank transfer", "Order through WhatsApp, pay later", "Not sure yet"], { required: true }),
      multi("admin", "What should the admin portal let you manage?", ["Products and stock", "Orders and statuses", "Customers", "Discount codes", "Analytics and reports", "Staff accounts", "Nothing, I will manage it with you"]),
      mc("delivery", "How will orders be delivered?", ["My own delivery", "A courier service (Bosta, Aramex and similar)", "Customer pickup only", "Not sure yet"]),
      languages,
      mc("assets", "Do you have your brand assets?", ["Logo and product photos are ready", "I have a logo only", "Nothing yet", "I would like help with it"]),
      mc("existing", "Do you already have a store to move from?", ["No, this is new", "Yes, a Shopify or similar store", "Yes, a custom site", "Only Instagram or WhatsApp"]),
      short("inspiration", "Any stores you like the look of? (links welcome)", { placeholder: "e.g. a link, or the brand name" })
    ]
  },
  {
    slug: "portfolio-site", iam: "I need a personal portfolio", title: "Portfolio and personal brand sites", who: "Students, professionals, creatives, researchers and public figures who need a site that represents them well.",
    summary: "A site that tells your story with proof, built around who will read it: an admissions officer, a recruiter, a client or an audience.",
    includes: ["Story-first structure and honest, specific copy", "Projects, awards, experience and timeline sections", "CV download, contact form and social links", "Arabic and English, light and dark themes", "Interactive details that fit your work", "A domain, analytics and a handoff so you can keep it updated"],
    stack: ["React or Next.js", "TypeScript", "Tailwind CSS", "Vercel"], skills: ["react", "nextjs", "typescript", "tailwind", "responsive", "i18n", "vercel"], categories: ["portfolio"],
    questions: [
      mc("audience", "Who is the site for?", ["A student applying to college or scholarships", "A professional or freelancer", "A creative (design, photo, video, music)", "A researcher or academic", "A public figure, journalist or speaker"], { other: true, required: true }),
      mc("goal", "What is the main goal?", ["Get hired", "Win clients", "Admissions or scholarships", "Build a personal brand", "Share research or writing"], { required: true }),
      multi("sections", "Which sections do you want?", ["About", "Projects or work", "Experience and timeline", "Writing or blog", "Awards and honors", "CV download", "Testimonials", "Gallery", "Case studies", "Contact form"], { required: true }),
      languages,
      mc("content", "How ready is your content?", ["Written and ready", "I have notes and links", "Nothing yet, I need help shaping it"], { required: true }),
      mc("style", "What style feels right?", ["Minimal and editorial", "Bold and creative", "Dark and technical", "Warm and personal", "Not sure, show me options"]),
      multi("extras", "Any extras?", ["Custom domain", "Analytics", "Newsletter sign-up", "Dark mode", "Animations and interactions", "Ability to edit it myself"]),
      short("links", "Links to your profiles or sites you admire", { placeholder: "LinkedIn, GitHub, Behance, examples" })
    ]
  },
  {
    slug: "business-site", iam: "I need a website for my business", title: "Business websites and landing pages", who: "Clinics, studios, venues, initiatives and small companies that need a credible online presence.",
    summary: "Clear, fast websites that explain what you do and make it easy for people to reach you.",
    includes: ["Home, about, services and contact pages", "Booking, enquiry and WhatsApp buttons", "Gallery, testimonials, FAQ and map", "SEO fundamentals and performance work", "Arabic, English or both", "Hosting guidance and a clean handoff"],
    stack: ["React or Next.js", "TypeScript", "Tailwind CSS", "Vercel"], skills: ["react", "nextjs", "typescript", "tailwind", "responsive", "i18n", "vercel"], categories: ["business-site"],
    questions: [
      mc("type", "What kind of business is it?", ["Retail or store", "Restaurant or cafe", "Clinic or health", "Education or training", "Studio or agency", "Venue or entertainment", "Non-profit or initiative"], { other: true, required: true }),
      multi("pages", "Which pages do you need?", ["Home", "About", "Services or menu", "Gallery", "Pricing", "Blog or news", "Contact", "FAQ", "Team"], { required: true }),
      multi("features", "Which features do you need?", ["Contact form", "Online booking", "WhatsApp button", "Map and directions", "Testimonials", "Newsletter", "Multi-language", "Online payments"]),
      mc("current", "Do you have a website today?", ["No", "Yes, and it needs a redesign", "Yes, and it needs fixes", "Only social media"], { required: true }),
      languages,
      mc("copy", "Who writes the content?", ["I will", "I will send notes and you write it", "I need help from scratch"]),
      mc("seo", "How important is showing up on Google?", ["Very important", "Somewhat important", "Not a priority"]),
      mc("after", "What do you need after launch?", ["Nothing, just hand it over", "Occasional updates", "Ongoing maintenance"]),
      mc("domain", "Domain and hosting", ["I have both", "I have a domain only", "I need help with both"])
    ]
  },
  {
    slug: "mobile-app", iam: "I need a mobile app", title: "Mobile app development", who: "Founders and businesses who need an Android and iOS app.",
    summary: "Flutter apps with Firebase or a custom back end, built from idea to store release, including sign-in, notifications and AI features.",
    includes: ["Flutter app for Android and iOS from one codebase", "Sign-in, profiles, notifications and offline support", "Firebase, Supabase or a custom API back end", "Payments, maps, camera and scanning where needed", "Arabic and English with right-to-left layout", "Play Store and App Store release support"],
    stack: ["Flutter and Dart", "Firebase or Supabase", "Cloud Functions", "Gemini API"], skills: ["flutter", "dart", "firebase", "supabase", "llm-apps", "testing", "i18n", "authentication"], categories: ["mobile"],
    questions: [
      mc("kind", "What kind of app is it?", ["A consumer app", "A tool for my business or team", "A marketplace or booking app", "A community or social app", "An education app", "A finance or tracking app"], { other: true, required: true }),
      multi("platforms", "Which platforms?", ["Android", "iOS", "Both, from one codebase", "Tablet"], { required: true }),
      multi("features", "Which features does it need?", ["Sign-in and accounts", "Push notifications", "Payments", "Maps and location", "Camera or scanning", "Works offline", "Chat", "AI features", "Admin panel", "Arabic and English"], { required: true }),
      mc("backend", "What about the back end?", ["I need you to build it", "I already have an API", "Firebase or Supabase is fine", "Not sure yet"], { required: true }),
      mc("stage", "Where are you now?", ["Just an idea", "I have wireframes", "Designs are ready", "I have an app that needs improving"], { required: true }),
      mc("stores", "Where should it be published?", ["Google Play", "App Store", "Both", "Neither, internal use only"]),
      mc("scale", "How many users do you expect in the first year?", ["Under 100", "100 to 1,000", "1,000 to 10,000", "More than 10,000", "No idea"]),
      short("idea", "In one sentence, what does the app do?", { required: true, placeholder: "e.g. lets students book tutors" })
    ]
  },
  {
    slug: "web-platform", iam: "I need a web platform or dashboard", title: "Web platforms and dashboards", who: "Teams that need a system with accounts, roles, data and workflows, such as learning platforms and portals.",
    summary: "Full-stack systems with role-based access, reporting and automation, built to stay reliable under real use.",
    includes: ["Role-based portals for admins, staff, customers or students", "Quizzes, bookings, reports and analytics", "Payments, file uploads and protected video", "WhatsApp and Telegram notifications", "A back end in ASP.NET Core or Node with PostgreSQL", "Testing, CI and deployment you can trust"],
    stack: ["React, Next.js, TypeScript", "ASP.NET Core or Node", "PostgreSQL", "Docker and GitHub Actions"], skills: ["react", "nextjs", "typescript", "aspnet-core", "postgresql", "authentication", "whatsapp", "testing", "docker", "github-actions"], categories: ["platform"],
    questions: [
      multi("type", "What kind of platform?", ["A learning platform", "Bookings or reservations", "A dashboard or analytics", "A marketplace", "A member or client portal", "An internal tool or CRM"], { other: true, required: true }),
      multi("roles", "Who will use it?", ["Admins", "Staff", "Customers", "Students", "Parents", "Partners"], { required: true }),
      multi("features", "Which features does it need?", ["Sign-in and permissions", "Payments", "Video lessons", "Quizzes or forms", "Reports and exports", "Messaging or WhatsApp", "File uploads", "Integrations with other systems", "Multiple languages"], { required: true }),
      mc("data", "Do you have existing data to bring in?", ["No, it starts empty", "Spreadsheets", "An older system", "Not sure"]),
      mc("users", "How many users do you expect?", ["Under 100", "100 to 1,000", "1,000 to 10,000", "More than 10,000"]),
      mc("hosting", "Where should it run?", ["Wherever you recommend", "A VPS I already have", "Cloud hosting like Vercel", "On my own servers"]),
      short("problem", "What is the biggest problem it should solve?", { required: true })
    ]
  },
  {
    slug: "ai-agent", iam: "I need an AI agent or automation", title: "AI agents and automation", who: "Teams that want AI to answer, read, extract or act, with people still in control.",
    summary: "Gemini-backed assistants and automations with validation, fallbacks and human approval, connected to the tools you already use.",
    includes: ["Chat assistants on your site, WhatsApp or inside an app", "Function calling that takes real actions, with approval gates", "Reading documents, PDFs and receipts (OCR and extraction)", "Summaries, drafts and recommendations", "Audit logging and clear limits on what the AI may do", "Evaluation, so you know how well it works"],
    stack: ["Gemini or other LLM APIs", "TypeScript or Python", "Cloud Functions", "WhatsApp and Telegram"], skills: ["llm-apps", "human-in-the-loop", "ocr", "python", "typescript", "whatsapp", "machine-learning"], categories: ["ai"],
    questions: [
      multi("tasks", "What should the AI do?", ["Answer customer questions", "Take actions in my system", "Read documents or PDFs", "Extract data from images or receipts", "Summarize or draft content", "Forecast or recommend", "Handle voice"], { other: true, required: true }),
      multi("where", "Where should it live?", ["My website", "WhatsApp", "Telegram", "A mobile app", "An internal dashboard", "Email"], { required: true }),
      multi("data", "What should it work from?", ["Documents", "A database", "My website content", "Spreadsheets", "APIs", "Nothing yet"]),
      mc("approval", "Should a person approve before it acts?", ["Always", "For risky actions only", "Never, it only answers", "Not sure, advise me"], { required: true }),
      languages,
      mc("privacy", "How sensitive is the data?", ["Public information only", "Business-confidential", "Personal or financial data"], { required: true }),
      mc("volume", "How many requests a day?", ["A few", "Dozens", "Hundreds", "Thousands"]),
      mc("model", "Any preference on the AI model?", ["No preference", "Gemini", "OpenAI", "Claude", "Self-hosted"]),
      long("example", "Walk me through one typical task from start to finish", { required: true, placeholder: "What comes in, what should happen, what comes out?" })
    ]
  },
  {
    slug: "pos-payments", iam: "I need a POS or payments setup", title: "POS, payments and offline-first systems", who: "Shops and venues that need a till that never stops, or payments that line up with the website.",
    summary: "Windows point-of-sale software with a local database that syncs to the cloud, plus Kashier and payment-link alignment.",
    includes: ["Windows POS: sales, refunds, purchases and cashier shifts", "Inventory, barcodes and receipt printing", "Cloud sync with inbox and outbox queues", "A storefront and admin portal on top", "Kashier terminals, payment links and catalog alignment", "Migration from older systems"],
    stack: ["C#, .NET and WPF", "SQLite and PostgreSQL", "ASP.NET Core", "Next.js"], skills: ["csharp", "wpf", "sqlite", "postgresql", "aspnet-core", "offline-first", "testing", "nextjs"], categories: ["desktop"],
    questions: [
      mc("type", "What kind of business?", ["Retail store", "Restaurant or cafe", "Pharmacy", "Gaming lounge or venue", "Wholesale", "Services"], { other: true, required: true }),
      multi("needs", "What do you need?", ["An offline-first POS", "Inventory management", "Receipts and barcodes", "Cashier shifts", "Reports", "An online storefront that syncs", "Payment links", "Kashier terminals"], { required: true }),
      mc("branches", "How many branches or tills?", ["One", "2 to 3", "4 to 10", "More than 10"], { required: true }),
      mc("devices", "Which devices?", ["Windows PCs", "Tablets", "Phones", "Not sure"]),
      mc("internet", "How reliable is the internet?", ["Reliable", "Sometimes drops", "Often unreliable"]),
      mc("legacy", "Do you have a system to move from?", ["No", "Spreadsheets", "Another POS", "Paper records"]),
      multi("hardware", "Hardware", ["Receipt printer", "Barcode scanner", "Cash drawer", "Card terminal", "None yet"])
    ]
  },
  {
    slug: "computer-vision", iam: "I need a machine learning or computer vision prototype", title: "Computer vision and machine learning", who: "Teams and researchers with video, images or data and a question to answer.",
    summary: "Detection, tracking, forecasting and OCR prototypes with honest evaluation, from first experiment to a demo.",
    includes: ["Object detection and tracking from video", "Camera calibration and geometry", "Forecasting, classification and recommendation", "OCR and document understanding", "Evaluation with clear limits, not inflated numbers", "A demo and a write-up you can show"],
    stack: ["Python", "YOLOv8, OpenCV", "scikit-learn, CatBoost", "FastAPI"], skills: ["python", "computer-vision", "yolo", "machine-learning", "ocr", "fastapi", "testing"], categories: ["ai", "research"],
    questions: [
      mc("goal", "What do you want to detect or predict?", ["Objects in video or images", "Sports or movement analysis", "Text in documents (OCR)", "A forecast from data", "A classification", "Recommendations"], { other: true, required: true }),
      mc("data", "What data do you have?", ["Plenty of labelled data", "Data, but unlabelled", "A little", "None yet"], { required: true }),
      multi("input", "What is the input?", ["Video", "Photos", "Text", "Tables or spreadsheets"], { required: true }),
      multi("output", "What should you get at the end?", ["A working demo", "An evaluation report", "An API", "Integration into my app or site"]),
      mc("bar", "How good does it need to be?", ["A prototype to explore the idea", "Good enough to show customers", "Production quality"], { required: true }),
      short("question", "State the question you want answered", { required: true })
    ]
  },
  {
    slug: "maintenance", iam: "Something I own is broken or needs work", title: "Fixes, maintenance and rescue", who: "Owners of a site, app or platform that is slow, broken or abandoned.",
    summary: "Debugging, upgrades and ongoing care for live systems, including ones someone else built.",
    includes: ["Bug fixing and production debugging", "Performance and reliability work", "Migrations, upgrades and hosting moves", "Design refreshes and new features", "Security and access clean-up", "Documentation so the next person can pick it up"],
    stack: ["Web, mobile and desktop stacks", "PostgreSQL, Firebase, Supabase", "Vercel, Docker, VPS"], skills: ["production", "testing", "react", "typescript", "postgresql", "docker", "github-actions"], categories: ["platform", "business-site"],
    questions: [
      mc("what", "What needs work?", ["A website", "A mobile app", "A web platform", "A desktop program"], { other: true, required: true }),
      multi("problem", "What is the problem?", ["Something is broken", "It is slow", "It needs a redesign", "I want new features", "Hosting or domain trouble", "A security concern", "I need to migrate it"], { required: true }),
      mc("access", "What access do you have?", ["The source code", "Only the live site", "Built by someone I cannot reach", "Not sure"], { required: true }),
      mc("urgency", "How urgent is it?", ["It is down right now", "This week", "This month", "No rush"], { required: true }),
      long("describe", "Describe what is wrong, in as much detail as you can", { required: true })
    ]
  }
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);

/** Questions asked of everyone, after the service-specific ones. */
export const commonQuestions: Question[] = [
  mc("budget", "What budget range do you have in mind?", ["Under EGP 10,000", "EGP 10,000 to 30,000", "EGP 30,000 to 75,000", "EGP 75,000 to 150,000", "More than EGP 150,000", "Not sure yet"], { required: true }),
  mc("timeline", "When do you need it?", ["As soon as possible", "Within a month", "In 2 to 3 months", "No fixed date"], { required: true }),
  mc("contact", "How should I reply?", ["Email", "WhatsApp", "Either is fine"], { required: true }),
  mc("heard", "How did you find me?", ["Google", "Instagram", "LinkedIn", "A friend or client", "Another site of mine"], { other: true })
];
