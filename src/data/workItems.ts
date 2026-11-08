import { getSkill, skillCatalog, type Skill } from "@/data/skillCatalog";

export type WorkKind = "engineering" | "client" | "activity";

export type WorkItem = {
  slug: string;
  kind: WorkKind;
  /** Also shown in the Client view (a platform or site I built for someone). */
  forClients?: boolean;
  name: string;
  category: string;
  period: string;
  status: string;
  role: string;
  summary: string;
  overview: string[];
  built: string[];
  numbers: Array<{ value: string; label: string }>;
  skills: string[];
  links: Array<{ label: string; href: string }>;
  image?: string;
  /** An existing full case-study page that this item opens instead of /work/:slug. */
  caseStudy?: string;
  note?: string;
};

const L = (label: string, href: string) => ({ label, href });

export const workItems: WorkItem[] = [
  // ---------- Engineering: case-study projects (full pages already exist) ----------
  {
    slug: "squashvar", kind: "engineering", caseStudy: "squashvar", name: "SquashVAR", category: "Computer vision research", period: "Sep 2025 to present",
    status: "Research prototype · manuscript submitted", role: "Independent developer and researcher",
    summary: "A one-camera assistant referee for squash that says NO_DECISION when a call is too close to make honestly.",
    overview: [], built: [], numbers: [{ value: "0.911", label: "detector mAP@50" }, { value: "3,001", label: "training images" }],
    skills: ["python", "computer-vision", "yolo", "machine-learning", "geospatial", "testing"], links: [L("Source code", "https://github.com/mahmoud-yassin10/SquashVAR")],
    image: "/images/portfolio/squashvar-court.webp"
  },
  {
    slug: "flousy", kind: "engineering", caseStudy: "flousy-ai-financial-planner", name: "Flousy", category: "Mobile app and AI", period: "Jan 2025 to present",
    status: "Android release on Google Play (reported)", role: "Founder and independent developer",
    summary: "An AI financial planner with bank-SMS import, built around the question: can I afford this?",
    overview: [], built: [], numbers: [{ value: "EGP 259,520", label: "tracked, reported" }, { value: "~100", label: "users, reported" }],
    skills: ["flutter", "dart", "firebase", "llm-apps", "testing", "i18n", "authentication"], links: [L("Visit Flousy", "/flousy")],
    image: "/images/portfolio/flousy-activity.webp"
  },
  {
    slug: "truetutor", kind: "engineering", forClients: true, caseStudy: "true-tutor-learning-platform", name: "TrueTutor", category: "Live EdTech platform", period: "Feb 2026 to present",
    status: "Live · sole active developer since May 2026", role: "Full-stack developer",
    summary: "A live test-prep platform I joined and now maintain, with quizzes, mock exams, protected video and messaging automation.",
    overview: [], built: [], numbers: [{ value: "5,732", label: "platform accounts" }, { value: "995", label: "of my commits in the repository" }],
    skills: ["typescript", "nextjs", "react", "postgresql", "prisma", "whatsapp", "authentication", "production", "vercel"], links: [L("Visit the platform", "https://new.thetruetutor.com")],
    image: "/images/portfolio/truetutor.webp"
  },
  {
    slug: "flood-lens", kind: "engineering", caseStudy: "flood-lens", name: "Flood Lens", category: "NASA Space Apps", period: "Oct 2025",
    status: "Prototype · Port Said 1st place, Global Nominee", role: "Team leader and lead developer",
    summary: "A flood-risk map that combines rainfall, radar water and terrain data, built with a five-person team.",
    overview: [], built: [], numbers: [{ value: "1st", label: "Port Said" }, { value: "5", label: "person team" }],
    skills: ["typescript", "react", "python", "geospatial", "leadership"], links: [L("Source code", "https://github.com/mahmoud-yassin10/flood-lens-nasa")],
    image: "/images/portfolio/flood-lens.webp"
  },
  {
    slug: "solar-share", kind: "engineering", caseStudy: "solar-share", name: "Solar Share", category: "Hackathon prototype", period: "Sep 2024 to May 2025",
    status: "Prototype · Ignited Best Idea Award", role: "Founder, developer and project lead",
    summary: "A peer-to-peer solar-sharing prototype that won Best Idea at the Ignited Hackathon.",
    overview: [], built: [], numbers: [{ value: "Best Idea", label: "Ignited, 2025" }],
    skills: ["flutter", "dart", "firebase", "javascript", "public-speaking"], links: []
  },

  // ---------- Engineering: new write-ups ----------
  {
    slug: "dr-zeyad-lms", kind: "engineering", forClients: true, name: "Dr. Zeyad Math LMS", category: "Live learning platform", period: "Jul 2026 to present",
    status: "Live · private repository", role: "One of three main contributors: 178 of 370 commits",
    summary: "A learning management system for math students preparing for the EST, Digital SAT and ACT, with student, teacher and parent portals.",
    image: "/images/work/dr-zeyad.webp",
    overview: [
      "Dr. Zeyad Math is an online math platform for Egyptian high school students. Students practice assignments, skills and weekly exams; teachers manage content and analytics; parents follow their child's progress. It also serves video lessons, PDF resources and WhatsApp notifications.",
      "I work on it as one of three main contributors, with the front end, back end, deployment and the daily homework system all changing week to week. The numbers below describe the whole repository, not only my part."
    ],
    built: [
      "Daily homework: teacher-built placement tests, saved levels, personal study plans, rotating skills and bulk editing",
      "A bulk question importer and question-bank search, with course pickers and clear actions across the assignment builder",
      "SAT quiz tools: the Desmos calculator and the official reference sheet, kept usable on iPad",
      "Private session booking with an admin visibility switch, and recorded lecture upload with completion tracking",
      "Student dashboards with a day heatmap, weak-point practice and mistake review; an admin insights page",
      "Dark mode, responsive assignment views, and cross-device login fixes for iPad, iPhone and Safari",
      "A durable WhatsApp message queue that survives reconnects, with a fresh QR code after logout",
      "Deploys to a Hostinger VPS through GitHub Actions, plus CI, backup and status workflows"
    ],
    numbers: [
      { value: "178", label: "of 370 commits are mine" }, { value: "161", label: "API endpoints" }, { value: "37", label: "model files" },
      { value: "36", label: "database migrations" }, { value: "55", label: "pages" }, { value: "124", label: "test files (30 back end, 94 front end)" }
    ],
    skills: ["csharp", "aspnet-core", "entity-framework", "postgresql", "react", "typescript", "tailwind", "docker", "github-actions", "testing", "whatsapp", "i18n", "authentication", "production"],
    links: [L("Visit the platform", "https://drzeyadmohamedmath.com")],
    note: "Counts come from the repository's current main branch and include all contributors. About 28,000 lines of C# and 49,000 of TypeScript, including tests."
  },
  {
    slug: "modx", kind: "engineering", forClients: true, name: "MODX", category: "Offline-first retail POS", period: "April to June 2026",
    status: "Delivered to the client · private repository", role: "Freelance full-stack developer, sole developer",
    summary: "A Windows point-of-sale that keeps working offline and syncs with a cloud back end, plus a storefront and admin portal.",
    overview: [
      "MODX needed a till that never stops, even when the internet does. I built a desktop POS with its own local database, a cloud back end it synchronizes with, and a web storefront and admin portal on top.",
      "I was the only developer, and the repository history shows 210 of its 211 commits."
    ],
    built: [
      "A Windows desktop POS in C#, .NET, WPF and SQLite: sales, inventory, refunds, purchases, cashier shifts, receipts, barcode workflows, users and permissions",
      "Cloud synchronization between SQLite and an ASP.NET Core and PostgreSQL back end, using inbox and outbox queues, event projection and inventory reconciliation",
      "A Next.js and TypeScript storefront and admin portal: catalog, accounts, checkout, orders, analytics, reporting and sync monitoring",
      "35 SQLite migrations, automated tests, deployment configuration, Windows packaging and legacy data-migration tooling"
    ],
    numbers: [{ value: "210", label: "of 211 commits" }, { value: "35", label: "SQLite migrations" }],
    skills: ["csharp", "wpf", "aspnet-core", "sqlite", "postgresql", "nextjs", "typescript", "offline-first", "testing"], links: [],
    note: "Client project. Screenshots and sales data stay private."
  },
  {
    slug: "surplussync", kind: "engineering", name: "SurplusSync Plus", category: "Hackathon: AI for climate action", period: "June 2026",
    status: "Prototype · four public repositories", role: "Developer of the platform, the AI copilot and the ML service",
    summary: "Uncertainty-aware school-meal forecasting with human-approved surplus recovery, built for the USAII Global AI Hackathon.",
    image: "/images/work/surplussync.webp",
    overview: [
      "School cafeterias often prepare food before the day fully unfolds. SurplusSync Plus forecasts meal participation, shows how uncertain the forecast is, recommends a safer quantity, and then guides staff through a controlled surplus-recovery workflow.",
      "It was built for the USAII Global AI Hackathon 2026, High School Track, around one fictional demonstration school. Forecasts are recommendations, never automatic actions."
    ],
    built: [
      "A forecasting service in Python using CatBoost attendance forecasts with quantile uncertainty, explicit safety floors and a safety buffer",
      "A command-center front end with a forecast ribbon, a decision canvas, what-if attendance simulation and an impact ledger",
      "A separate AI Operations Copilot using Gemini function calling, with approvals, overrides, permissions, transparency and audit logging",
      "Human approval gates before any operational step, and separate tracking of projected and confirmed impact"
    ],
    numbers: [{ value: "4", label: "public repositories" }],
    skills: ["typescript", "python", "react", "machine-learning", "llm-apps", "human-in-the-loop", "testing", "vercel"],
    links: [L("Live platform", "https://surplussync-platform.vercel.app"), L("Platform repository", "https://github.com/mahmoud-yassin10/surplussync-platform"), L("AI copilot repository", "https://github.com/mahmoud-yassin10/surplussync-copilot-lab"), L("ML service repository", "https://github.com/mahmoud-yassin10/surplussync-ml-service")],
    note: "A hackathon prototype with demonstration data, not a deployed school system."
  },
  {
    slug: "mr-ghonem-math", kind: "engineering", forClients: true, name: "Mr. Ghonem Mathematics", category: "Tutoring platform", period: "Mar 2026 to present",
    status: "Live · private repository", role: "Freelance full-stack developer",
    summary: "A tutoring site and platform for SAT, ACT and EST math, with student login, practice quizzes and mock exams.",
    image: "/images/work/mr-ghonem.webp",
    overview: [
      "Mr. Mohamed Ghonem tutors SAT, ACT and EST mathematics in Port Said. The site presents his courses and gives students a place to log in, practice with quizzes and sit mock exams.",
      "The repository shows 203 of its commits from me, with the rest from AI coding tools."
    ],
    built: [
      "A React, Vite and TypeScript front end styled with Tailwind",
      "A Supabase back end: database, row-level security, storage and edge functions, with a migration guide for moving to the client's own project",
      "Automated tests, linting, and Vercel deployment with single-page-app routing"
    ],
    numbers: [{ value: "203", label: "of my commits" }],
    skills: ["react", "typescript", "tailwind", "supabase", "postgresql", "authentication", "testing", "vercel", "responsive"],
    links: [L("Visit the site", "https://mrghonem.vercel.app")]
  },
  {
    slug: "imkan", kind: "engineering", name: "Imkan (Isharati)", category: "Accessible education", period: "Sep 2026",
    status: "Live · public repository · team project", role: "Contributor: 22 of about 46 commits, the largest share",
    summary: "A platform that teaches physics in Egyptian Sign Language, with a sign for each term and an interactive lab that works without sound.",
    image: "/images/work/imkan.webp",
    overview: [
      "Imkan is an Egyptian learning platform that explains physics in Egyptian Sign Language. The site is Arabic-first and walks learners through lessons with a sign for each term.",
      "The repository pairs a FastAPI back end with a sign-recognition model of 502 classes, text and speech to sign animation, and a web front end. I worked on it with a small team."
    ],
    built: [
      "Contributed to the web front end and its Arabic-first interface",
      "Worked within a monorepo that combines a vision model, an animation API and a tutor interface"
    ],
    numbers: [{ value: "22", label: "of my commits" }, { value: "502", label: "sign classes in the model" }],
    skills: ["python", "fastapi", "typescript", "machine-learning", "i18n", "responsive", "vercel"],
    links: [L("Visit the site", "https://imkan-ai.vercel.app"), L("Repository", "https://github.com/mahmoud-yassin10/Isharati")],
    note: "A team project. The repository is a fork of the group's original."
  },
  {
    slug: "split", kind: "engineering", name: "Split", category: "Personal web app", period: "Sep 2026",
    status: "Live · private repository", role: "Solo developer",
    summary: "A receipt splitter: photograph a bill, assign people to the lines and share who owes what. Friends never install anything.",
    image: "/images/work/split.webp",
    overview: [
      "Splitting a restaurant bill should take a minute. Split reads a photo of the receipt, lets you assign people to each line, and produces a shareable summary.",
      "Data stays in the browser (IndexedDB), and the app installs as a PWA on a phone."
    ],
    built: [
      "Receipt scanning from a phone camera, with a Gemini-backed OCR route on the server",
      "A React and TypeScript PWA with local storage in IndexedDB and animated interactions",
      "A deployment on Vercel with the API key kept on the server"
    ],
    numbers: [], skills: ["typescript", "react", "ocr", "llm-apps", "vercel", "responsive"],
    links: [L("Open Split", "https://split-billl.vercel.app")]
  },
  {
    slug: "decodelabs", kind: "engineering", name: "DecodeLabs AI projects", category: "AI internship", period: "May to June 2026",
    status: "Completed · public repository", role: "Artificial intelligence intern",
    summary: "Four Python projects from an applied AI internship: rules, supervised learning, recommendation and OCR.",
    overview: [
      "The DecodeLabs Industrial Training Kit is an internship track of hands-on AI projects. Each project in the repository has its own source, documentation and generated reports."
    ],
    built: [
      "A rule-based chatbot built on Python control flow and dictionary logic",
      "An Iris classification pipeline comparing KNN, Decision Tree, Logistic Regression and Random Forest with 5-fold cross-validation",
      "A content-based course recommender using TF-IDF and cosine similarity",
      "An OCR pipeline with OpenCV and Tesseract that compared 20 preprocessing setups"
    ],
    numbers: [{ value: "95.96%", label: "average OCR word confidence" }, { value: "20", label: "OCR setups compared" }],
    skills: ["python", "machine-learning", "ocr", "testing"], links: [L("Repository", "https://github.com/mahmoud-yassin10/decodelabs_tasks")]
  },

  // ---------- Client websites ----------
  {
    slug: "niney-yassin", kind: "client", name: "Niney Yassin", category: "Personal brand site", period: "Jan 2026",
    status: "Live · public repository", role: "Freelance developer",
    summary: "A portfolio for a political communicator, covering politics, diplomacy, journalism, media and leadership.",
    image: "/images/work/niney-yassin.webp",
    overview: ["A personal website that presents a political journalist, speaker, event MC and media strategist: her work, her writing and how to work with her."],
    built: ["A React and TypeScript site with sections for work, writing, research and contact", "A warm, editorial identity built around the client's own colors and portrait", "Downloadable CV and links to her social profiles"],
    numbers: [], skills: ["react", "typescript", "tailwind", "responsive", "vercel"],
    links: [L("Visit the site", "https://nineyyassin.com"), L("Repository", "https://github.com/mahmoud-yassin10/Niney")]
  },
  {
    slug: "fresheria", kind: "client", name: "Fresheria Cookies", category: "Online store", period: "Jan 2026",
    status: "Live", role: "Freelance developer",
    summary: "A mobile-first cookie store with a catalog, cart, checkout, order tracking and an admin portal.",
    image: "/images/work/fresheria.webp",
    overview: ["Fresheria needed a way for a local cookie brand to start taking orders quickly. The site lets customers browse by category, add to a cart, check out, and follow their order, while the owner manages everything from an admin portal."],
    built: ["Catalog with categories, search and filters, and a cart with quantity controls", "Checkout with address and payment options, order tracking and WhatsApp ordering", "An admin portal for orders, payment verification, menu management and store settings", "Arabic and English, with dark and light modes"],
    numbers: [], skills: ["react", "typescript", "ecommerce", "i18n", "responsive", "vercel"], links: [L("Visit the site", "https://fresheria.vercel.app")]
  },
  {
    slug: "revwear", kind: "client", name: "RevWear", category: "Streetwear store", period: "Jan 2026",
    status: "Live · public repository", role: "Freelance developer",
    summary: "A performance-driven storefront for an automotive streetwear brand, with limited drops and custom builds.",
    image: "/images/work/revwear.webp",
    overview: ["RevWear sells automotive lifestyle and streetwear inspired by car culture. The storefront carries limited drops and custom builds made from a customer's own car."],
    built: ["Shop, product, cart, checkout and about pages in Next.js 14 with the App Router", "shadcn/ui components, dark theme, and a cart that persists in the browser", "Arabic toggle, brand assets and a custom-builds section"],
    numbers: [], skills: ["nextjs", "typescript", "tailwind", "ecommerce", "responsive", "vercel", "i18n"],
    links: [L("Visit the site", "https://revwear.store"), L("Repository", "https://github.com/mahmoud-yassin10/revwear")]
  },
  {
    slug: "femplus", kind: "client", name: "FEM+", category: "Editorial magazine", period: "Jan 2026",
    status: "Live", role: "Freelance developer",
    summary: "A premium editorial website for modern femininity, with category-based articles and a newsletter-ready layout.",
    image: "/images/work/femplus.webp",
    overview: ["FEM+ is a magazine-style site about self and wellness, style and beauty, and career and ambition. The design leans on serif headlines, a deep burgundy palette and generous space for reading."],
    built: ["Category-based article pages and an editorial home page", "MDX content and a newsletter sign-up", "A responsive reading layout"],
    numbers: [], skills: ["nextjs", "javascript", "tailwind", "responsive", "vercel"], links: [L("Visit the site", "https://femplusmag.com")]
  },
  {
    slug: "nine-store", kind: "client", name: "NINE STORE", category: "Fashion storefront", period: "Jun 2026",
    status: "Live", role: "Freelance developer",
    summary: "An art-directed fashion storefront with an admin portal.",
    image: "/images/work/nine-store.webp",
    overview: ["NINE STORE is a fashion brand with an editorial point of view. The site pairs big photography and bold type with a working catalog and an admin portal."],
    built: ["An art-directed storefront in Next.js with motion", "An admin portal for catalog, orders, customers and settings", "A structure ready to move from demo data to a database and storage"],
    numbers: [], skills: ["nextjs", "typescript", "tailwind", "ecommerce", "responsive", "vercel"], links: [L("Visit the site", "https://nine-store-tau.vercel.app")]
  },
  {
    slug: "literary-lounge", kind: "client", name: "The Literary Lounge", category: "Bookstore e-commerce", period: "Aug 2026",
    status: "Live", role: "Freelance developer",
    summary: "A mobile-first store for an Egyptian Instagram bookstore, with book requests and print-on-demand.",
    image: "/images/work/literary-lounge.webp",
    overview: ["The Literary Lounge sells books through Instagram and delivers across Egypt. The site moves that into a proper storefront while keeping what makes it special: customers can request books they cannot find."],
    built: ["A shop with a shelf-style home page and a request-a-book flow", "A mobile-first, production-structured e-commerce build", "Delivery and request messaging aimed at Egyptian readers"],
    numbers: [], skills: ["react", "typescript", "tailwind", "ecommerce", "responsive", "vercel"], links: [L("Visit the site", "https://literary-lounge.vercel.app")]
  },
  {
    slug: "vibe-trend", kind: "client", name: "Vibe Trend", category: "Streetwear e-commerce", period: "Sep 2026",
    status: "Live", role: "Freelance developer",
    summary: "A dark, futuristic e-commerce site for a Cairo streetwear brand.",
    image: "/images/work/vibe-trend.webp",
    overview: ["Vibe Trend is a Cairo streetwear brand. The brief was a site that feels like a dark operating system crossed with an underground editorial magazine, with sharp geometry and condensed type."],
    built: ["A full-stack responsive store with shop, drops and cart", "Bold distressed display typography against a near-black palette", "An art-directed homepage built to a detailed visual specification"],
    numbers: [], skills: ["react", "typescript", "tailwind", "ecommerce", "responsive", "vercel"], links: [L("Visit the site", "https://vibe-trend.vercel.app")]
  },
  {
    slug: "bank-elafkar", kind: "client", name: "Port Said Idea Bank", category: "Initiative website", period: "May 2026",
    status: "Live", role: "Freelance developer",
    summary: "An Arabic-first website for a Port Said youth initiative that collects and supports ideas.",
    image: "/images/work/bank-elafkar.webp",
    overview: ["The Port Said Idea Bank is an initiative that invites young people to share ideas. The site is written in Arabic first, with a bold green identity and clear calls to share an idea."],
    built: ["An Arabic, right-to-left site with an about section and idea-sharing calls to action", "A TypeScript front end with a Postgres-backed data layer", "Responsive layouts for phones, where most visitors arrive"],
    numbers: [], skills: ["typescript", "react", "i18n", "postgresql", "responsive", "vercel"], links: [L("Visit the site", "https://bank-elafkar.vercel.app")]
  },
  {
    slug: "ell3ba", kind: "client", image: "/images/work/ell3ba.webp", name: "Ell3ba Gaming Lounge", category: "Gaming lounge management system", period: "Apr to Jul 2026",
    status: "Live · private repository", role: "Freelance developer",
    summary: "A management dashboard for a gaming lounge: stations, timed sessions, pricing, shifts and product sales.",
    overview: ["Ell3ba is a gaming lounge. Running one means tracking which devices are free, who is playing, for how long and what they owe. The admin dashboard puts all of that on one screen."],
    built: ["A dashboard showing available and occupied devices at a glance, with search and filters", "Per-station sessions with single and multi-player modes, live timers and running cost in EGP", "Shifts (open and close), product sales and a private room", "Sign-in, Arabic and English through i18next, validation with zod and Firebase for data"],
    numbers: [{ value: "44", label: "of my commits" }], skills: ["typescript", "react", "firebase", "i18n", "authentication", "vercel"], links: [L("Visit the site", "https://ell3ba.vercel.app")]
  },
  {
    slug: "striker", kind: "client", image: "/images/work/striker.webp", name: "Striker Gaming Lounge", category: "Gaming lounge management system", period: "May to Jul 2026",
    status: "Live · private repository", role: "Freelance developer",
    summary: "A second gaming-lounge management dashboard, with timed station sessions, shifts and product sales.",
    overview: ["Striker is a gaming lounge. The system follows the same approach as Ell3ba, tuned to its own venue: devices, sessions, pricing and the till in one dashboard."],
    built: ["An admin dashboard with available, occupied and total gaming devices", "Station sessions with live timers, adjustable start and end times and running cost", "Shifts, product sales and a private room with its own timer", "Sign-in, Arabic and English through i18next, validation with zod and Firebase for data"],
    numbers: [{ value: "63", label: "of my commits" }], skills: ["typescript", "react", "firebase", "i18n", "authentication", "vercel"], links: [L("Visit the site", "https://striker-alpha.vercel.app")]
  },

  // ---------- Activities ----------
  {
    slug: "freelance", kind: "activity", name: "Freelance software development", category: "Build", period: "May 2023 to present",
    status: "Ongoing", role: "Independent developer",
    summary: "Websites, apps and business platforms for local brands and service businesses, from requirements to deployment and support.",
    overview: ["Since 2023 I have built websites, mobile apps and business platforms for clients across Egypt. Each project means turning a conversation about what someone needs into something deployed, then keeping it working."],
    built: ["Gathering requirements and translating them into features", "Building, testing and deploying with React, TypeScript, Next.js, Flutter and Firebase or Supabase", "Maintaining sites after launch and supporting the people who use them"],
    numbers: [{ value: "13", label: "projects on this site" }], skills: ["typescript", "react", "nextjs", "flutter", "supabase", "firebase", "production", "responsive"], links: []
  },
  {
    slug: "nis-parents-app", kind: "activity", name: "NIS Parents App", category: "Build", period: "Spring to September 2025",
    status: "Completed", role: "Software development intern",
    summary: "An internship on the school's Flutter app for parents and staff, on Android and iOS.",
    overview: ["I joined the School Development Team to work on the existing NIS Parents App, a Flutter application for Android and iOS. It was not my app to found or rebuild; my job was to improve what parents and staff use every day."],
    built: ["Adjusted features and improved stability across parent-facing workflows", "Reproduced bugs and documented them with clear, evidenced reports", "Ran end-to-end and regression tests on new builds to improve release quality"],
    numbers: [], skills: ["flutter", "dart", "testing"], links: []
  },
  {
    slug: "nis-student-body", kind: "activity", name: "NIS Student Body", category: "Teach and lead", period: "Sep 2025 to May 2026",
    status: "Completed", role: "President",
    summary: "Representing students before school leadership and turning their feedback into priorities.",
    overview: ["As student body president I represented students before the school's leadership and coordinated initiatives and events."],
    built: ["Converted student feedback into academic and campus priorities", "Worked with administrators and student leaders on participation, accountability and communication"],
    numbers: [], skills: ["leadership", "community", "public-speaking"], links: []
  },
  {
    slug: "peer-tutoring", kind: "activity", name: "NIS Peer Tutoring Program", category: "Teach and lead", period: "2025 to 2026",
    status: "Co-founded", role: "Co-founder and tutor trainer",
    summary: "A peer-tutoring program that trains high-achieving students to support their classmates, planned for seven NIS campuses.",
    overview: ["Peer tutoring turns students who understand a subject into the people who help others learn it. We designed how tutors are chosen, trained and matched with students, and how the program could grow beyond one campus."],
    built: ["Selection and training systems for student tutors", "An expansion model across seven NIS campuses", "Support for subject-specific sessions and personalized help"],
    numbers: [{ value: "12", label: "tutors in one report" }, { value: "~45", label: "students supported in that report" }, { value: "7", label: "campuses in the expansion plan" }],
    skills: ["teaching", "leadership", "community"], links: [], note: "Figures come from one supporting report, not a current count. Recognition by Egypt's Minister of Education is reported."
  },
  {
    slug: "schoolhouse", kind: "activity", name: "Schoolhouse.world", category: "Teach and lead", period: "Oct 2025 to May 2026",
    status: "Completed", role: "SAT tutor",
    summary: "Live SAT sessions for learners around the world on a free tutoring platform.",
    overview: ["I was invited to tutor SAT preparation on Schoolhouse.world. I ran live sessions with screen sharing and Desmos, with room for typed questions and different levels."],
    built: ["Adapting explanations and practice to each group's gaps", "Valuing a student's reasoning over memorized answers", "Teaching learners from many countries at once"],
    numbers: [{ value: "16", label: "live sessions" }, { value: "41", label: "learners" }, { value: "19", label: "countries" }, { value: "69", label: "positive ratings, 48 Super Helpful" }],
    skills: ["teaching", "public-speaking", "community"], links: [], note: "Figures are from the May 27, 2026 profile snapshot (22 tutoring hours)."
  },
  {
    slug: "sat-tutor-assistant", kind: "activity", name: "SAT tutor assistant", category: "Teach and lead", period: "2025",
    status: "Completed", role: "Instructional assistant to Mr. Mohamed Ghoneim",
    summary: "Practice sets, mock exams and study plans for SAT students.",
    overview: ["I supported an SAT tutor by building the practice material his students needed and reviewing their mistakes."],
    built: ["Created practice questions and mock exams", "Reviewed mistakes with students", "Helped shape individual study plans"],
    numbers: [], skills: ["teaching", "testing"], links: []
  },
  {
    slug: "techno-square", kind: "activity", name: "Techno Square", category: "Teach and lead", period: "June to September 2025",
    status: "Completed", role: "Coding and robotics instructor",
    summary: "Hands-on coding and robotics for students aged about 6 to 18.",
    overview: ["I taught coding and robotics through practice: students build something, break it and debug it."],
    built: ["Scratch for beginners, Python for older students and basic Arduino", "Debugging as a skill, not a punishment", "Lessons pitched to very different ages"],
    numbers: [], skills: ["teaching", "python", "public-speaking"], links: []
  },
  {
    slug: "eg-scholars-workshops", kind: "activity", name: "CS and AI workshops", category: "Teach and lead", period: "2026",
    status: "Completed", role: "Workshop instructor, EG Scholars and Yalla Success",
    summary: "Four practical coding and AI workshops for a community of more than 500 learners.",
    overview: ["EG Scholars is a learning community of more than 500 members. I designed and led four hands-on coding and AI workshops for it."],
    built: ["Practical coding assignments for each workshop", "Mentoring learners through their projects"],
    numbers: [{ value: "4", label: "workshops" }, { value: "500+", label: "community members" }],
    skills: ["teaching", "python", "public-speaking", "community"], links: [], note: "The community size is not the number of people who attended each workshop."
  },
  {
    slug: "jplp", kind: "activity", name: "NTA Junior Presidential Leadership Program", category: "Teach and lead", period: "Aug to Sep 2025",
    status: "Completed", role: "Selected participant",
    summary: "A 21-day residential leadership program at the National Training Academy in Cairo.",
    overview: ["I was one of 100 participants selected from 7,315 applicants, about 1.37 percent, for an intensive residential program in leadership, entrepreneurship, teamwork and national development."],
    built: ["Policy-focused team challenges", "Training in critical thinking, communication and problem solving", "Selected for a national television interview on ONTV"],
    numbers: [{ value: "100", label: "selected" }, { value: "7,315", label: "applicants" }, { value: "21", label: "days" }],
    skills: ["leadership", "public-speaking", "community"], links: []
  },
  {
    slug: "el-nasr-hospital", kind: "activity", name: "El-Nasr Hospital Childhood Cancer Day", category: "Teach and lead", period: "February 2025",
    status: "Completed", role: "Co-organizer",
    summary: "A day for pediatric patients and their families, with gifts, guests and logistics.",
    overview: ["I helped coordinate a Childhood Cancer Day event at El-Nasr Hospital in Port Said: bringing guests, gifts and activities together for children and their families."],
    built: ["Coordinating guests and logistics", "Organizing gifts for the children"], numbers: [{ value: "~50", label: "pediatric patients" }, { value: "~100", label: "attendees" }],
    skills: ["community", "leadership"], links: [], note: "Figures are from an earlier account of the event."
  },
  {
    slug: "competitive-squash", kind: "activity", name: "Competitive squash", category: "Sport", period: "From about 2019",
    status: "Completed", role: "National athlete",
    summary: "Competing at national level, and the source of the questions behind SquashVAR.",
    overview: ["Squash is where many of my questions start. Competing taught me how fast a rally moves, how much a referee has to decide in an instant, and why evidence matters."],
    built: ["More than 10 national tournaments", "Ranked No. 42 in the Egyptian U17 division"],
    numbers: [{ value: "10+", label: "national tournaments" }, { value: "42", label: "Egypt U17 ranking" }], skills: ["competitive-sport"], links: []
  },
  {
    slug: "squash-coaching", kind: "activity", name: "Youth squash coaching", category: "Sport", period: "From September 2024",
    status: "Ongoing", role: "Coach",
    summary: "Coaching younger players in technique, strategy and confidence.",
    overview: ["Coaching taught me that seeing the right move and helping someone make it are different skills."],
    built: ["Choosing the one correction a player can use in the next rally", "Coaching players at different levels"],
    numbers: [], skills: ["teaching", "competitive-sport"], links: [], note: "One player I coached later ranked Egypt U11 No. 4. I do not claim credit for that ranking."
  },
  {
    slug: "karate", kind: "activity", name: "Karate", category: "Sport", period: "2012 to 2019",
    status: "Completed", role: "First-dan black belt, national competitor",
    summary: "Seven years of training and competition that ended in a first-dan black belt.",
    overview: ["Karate gave me discipline, composure and the habit of performing under pressure."],
    built: ["Technical, conditioning and competition training", "Earned a first-dan black belt"], numbers: [{ value: "1st", label: "dan black belt" }],
    skills: ["competitive-sport"], links: []
  }
];

// ---------- Lookups ----------
const itemBySlug = new Map(workItems.map((item) => [item.slug, item]));
export const getWorkItem = (slug: string) => itemBySlug.get(slug);
export const itemHref = (item: WorkItem) => (item.caseStudy ? `/projects/${item.caseStudy}` : `/work/${item.slug}`);

export const engineeringItems = workItems.filter((item) => item.kind === "engineering");
export const clientItems = workItems.filter((item) => item.kind === "client" || (item.kind === "engineering" && item.forClients));
export const activityItems = workItems.filter((item) => item.kind === "activity");

export const itemsForSkill = (skillSlug: string) => workItems.filter((item) => item.skills.includes(skillSlug));
export const skillsForItem = (item: WorkItem): Skill[] => item.skills.map((slug) => getSkill(slug)).filter((skill): skill is Skill => Boolean(skill));

/** Skills that appear together with this one, most shared first. */
export const relatedSkills = (skillSlug: string, limit = 8): Array<{ skill: Skill; shared: number }> => {
  const counts = new Map<string, number>();
  for (const item of itemsForSkill(skillSlug)) for (const other of item.skills) if (other !== skillSlug) counts.set(other, (counts.get(other) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit)
    .map(([slug, shared]) => ({ skill: getSkill(slug)!, shared })).filter((entry) => entry.skill);
};

/** Items similar to this one, by number of shared skills. */
export const similarItems = (item: WorkItem, limit = 3): WorkItem[] =>
  workItems.filter((other) => other.slug !== item.slug && other.kind !== "activity" === (item.kind !== "activity"))
    .map((other) => ({ other, score: other.skills.filter((s) => item.skills.includes(s)).length }))
    .filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((entry) => entry.other);

export const usedSkills = skillCatalog.filter((skill) => itemsForSkill(skill.slug).length > 0);
