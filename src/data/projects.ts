export type Project = {
  title: string;
  description: string;
  tech: string[];
  /** Programming languages & core runtime tooling (e.g. Dart, TypeScript, Python). */
  programmingLanguages: string[];
  /** Languages used in the UI and content (e.g. English, Arabic). */
  contentLanguages: string[];
  /** Product and site capabilities end users interact with. */
  features: string[];
  period: string;
  link: string;
  type: string;
  slug: string;
  longDescription: string;
  skillsUsed: string[];
  responsibilities: string[];
  highlights: string[];
  externalLinkPlaceholder: string;
  externalLink?: string;
  /** Optional URL used only for the embedded preview (for example, a forced language variant). */
  livePreviewUrl?: string;
  /** Use the live iframe immediately when a project needs the restored browser-frame treatment. */
  livePreviewMode?: "screenshot" | "iframe";
  /**
   * If set, skip screenshot APIs and reveal the live iframe after this many ms so splash screens
   * can finish before the preview is shown (e.g. Flousy marketing site).
   */
  livePreviewRevealDelayMs?: number;
};

export type ProjectTileData = Pick<Project, "title" | "description" | "tech" | "period" | "link" | "type"> & {
  slug?: string;
};

type ProjectSeed = Omit<
  Project,
  | "longDescription"
  | "skillsUsed"
  | "responsibilities"
  | "highlights"
  | "externalLinkPlaceholder"
  | "programmingLanguages"
  | "contentLanguages"
  | "features"
> &
  Partial<
    Pick<
      Project,
      | "longDescription"
      | "skillsUsed"
      | "responsibilities"
      | "highlights"
      | "externalLinkPlaceholder"
      | "programmingLanguages"
      | "contentLanguages"
      | "features"
    >
  >;

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

const fallbackLongDescription =
  "Detailed case study coming soon. This page will include the full scope, implementation details, and results.";
const fallbackHighlights = [
  "Planned and built the core user flows",
  "Implemented responsive UI and component structure",
  "Optimized loading and performance"
];
const fallbackResponsibilities = [
  "Planned and built the core user flows",
  "Implemented responsive UI and component structure",
  "Optimized loading and performance"
];
const fallbackSkillsExtras = ["UI/UX", "Performance", "Data visualization"];

const buildSkillsUsed = (project: ProjectSeed) => {
  if (project.skillsUsed && project.skillsUsed.length > 0) {
    return project.skillsUsed;
  }

  const baseSkills = project.tech ?? [];
  return Array.from(new Set([...baseSkills, ...fallbackSkillsExtras]));
};

const projectSeeds: ProjectSeed[] = [
  {
    title: "Flousy \u2014 AI Financial Planner",
    description: "A bilingual (Arabic / English) personal-finance app for Egyptian users: transactions imported from bank SMS, AI-built monthly budgets, goals and debts, and decision tools like Safe to Spend and Can I Spend?",
    tech: ["Flutter", "Dart", "Firebase", "Gemini", "Cloud Functions"],
    period: "Jan 2025 \u2013 Present",
    link: `${base}/projects/flousy-ai-financial-planner`,
    type: "Mobile App",
    slug: "flousy-ai-financial-planner",
    longDescription: "Flousy moves from recording money toward advising what is affordable. It imports Egyptian bank SMS messages on Android, builds and re-evaluates monthly budgets with Gemini through Cloud Functions, and answers the questions people ask before spending. One developer built the Flutter app, the Firebase backend and the planner.",
    skillsUsed: ["Flutter", "Dart", "Firebase", "Cloud Functions", "LLM structured output", "Localization and RTL"],
    responsibilities: [
      "Designed the product and every user flow",
      "Built the Flutter app and Firebase backend",
      "Built Android SMS import with confirmation and false-detection reporting",
      "Built the Gemini-backed budget planner and its fallbacks",
      "Built Safe to Spend and Can I Spend? from user feedback"
    ],
    highlights: [
      "306 transactions tracked (reported)",
      "About 100 users (reported)",
      "Android release on Google Play (reported)"
    ],
    programmingLanguages: ["Dart", "TypeScript"],
    contentLanguages: ["English", "Arabic"],
    features: [
      "Transaction tracking and Android bank-SMS import",
      "Monthly budgets built and re-evaluated by AI",
      "Debts, installments, subscriptions and savings goals",
      "Safe to Spend and Can I Spend? decision tools",
      "Voice capture and reminders",
      "Arabic / English interface with RTL support"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://flousy.mahmoud-yassin.com",
    livePreviewRevealDelayMs: 3000
  },
  {
    title: "SquashVAR",
    description: "A single-camera, geometry-aware assistant referee for squash. It detects and tracks the ball, maps it onto a calibrated court, finds impacts, and returns IN, OUT or NO_DECISION. Revised manuscript submitted and awaiting review.",
    tech: ["Python", "YOLOv8", "BoT-SORT", "OpenCV"],
    period: "Sep 2025 \u2013 Present",
    link: `${base}/projects/squashvar`,
    type: "Research",
    slug: "squashvar",
    longDescription: "Research prototype for evidence-based squash officiating from one ordinary camera. A fine-tuned YOLOv8-S detector and BoT-SORT tracker follow the ball, four calibrated court planes convert pixels to centimeters, and an impact detector compares mapped impacts with the court lines. Near a line the system abstains with NO_DECISION instead of forcing a call. It is a research prototype, not a production officiating system.",
    skillsUsed: ["Python", "Computer Vision", "Object detection", "Multi-object tracking", "Homography and camera calibration", "Evaluation design"],
    responsibilities: [
      "Fine-tuned and evaluated the ball detector",
      "Built tracking, court calibration and impact detection",
      "Designed the IN / OUT / NO_DECISION policy",
      "Wrote the evaluation scripts and overlays",
      "Revised the manuscript after journal review"
    ],
    highlights: [
      "YOLOv8-S detector: 0.911 mAP@50 (1280 px) and 0.937 precision (1920 px)",
      "Abstains near a line instead of forcing a call",
      "Revised manuscript submitted, awaiting review"
    ],
    programmingLanguages: ["Python"],
    contentLanguages: ["English"],
    features: [
      "Ball detection with a fine-tuned YOLOv8-S model",
      "Multi-frame tracking with BoT-SORT",
      "Four calibrated court planes with planar homographies",
      "Impact detection from velocity, direction change and surface proximity",
      "IN / OUT / NO_DECISION policy with a +/- 2 cm abstention band",
      "Evaluation scripts and overlay rendering"
    ],
    externalLinkPlaceholder: "#"
  },
  {
    title: "Solar Share",
    description: "A peer-to-peer solar-energy sharing prototype that connects households with surplus solar power to nearby households. Ignited Hackathon Best Idea Award.",
    tech: ["Flutter", "Dart", "JavaScript", "Firebase"],
    period: "Sep 2024 \u2013 May 2025",
    link: `${base}/projects/solar-share`,
    type: "Platform",
    slug: "solar-share",
    longDescription: "Competition prototype for neighborhood-scale solar sharing. I defined the requirements, built the Flutter and JavaScript / Firebase prototype, and prepared the live demo and technical pitch. It is a prototype and award-winning concept, not an operating energy network.",
    skillsUsed: ["Flutter", "Dart", "JavaScript", "Firebase", "Prototyping", "Pitching"],
    responsibilities: [
      "Developed the concept and defined requirements",
      "Built the prototype",
      "Prepared the live demo and technical pitch"
    ],
    highlights: [
      "Ignited Hackathon Best Idea Award (2025)",
      "Prototype only: no real electricity exchange"
    ],
    programmingLanguages: ["Dart", "JavaScript"],
    contentLanguages: ["English"],
    features: [
      "Peer-to-peer sharing concept for nearby households",
      "Flutter app and JavaScript / Firebase implementation",
      "Demo-ready flow prepared for the competition"
    ],
    externalLinkPlaceholder: "#"
  },
  {
    title: "Flood Lens",
    description: "A flood-risk visualization prototype built at NASA Space Apps: 1st place in Port Said and Global Nominee. It combines rainfall, satellite water and terrain data into a map, and is not a validated flood-prediction system.",
    tech: ["React", "TypeScript", "Leaflet", "Python", "NASA data"],
    period: "Oct 2025",
    link: `${base}/projects/flood-lens`,
    type: "Web App",
    slug: "flood-lens",
    longDescription: "Web prototype that brings NASA GPM IMERG rainfall, Sentinel-1 / OPERA radar water observations and SRTM terrain into one map with a rule-based 0 to 100 risk index. The demo used seeded data to stay usable, and there is no labelled benchmark, so accuracy is unknown. I led a five-person team and built the interface and data pipeline.",
    skillsUsed: ["React", "TypeScript", "Leaflet", "Python", "Geospatial data", "Data visualization"],
    responsibilities: [
      "Led a five-person team",
      "Built the web interface and data pipeline",
      "Built the rule-based risk index",
      "Prepared the technical pitch"
    ],
    highlights: [
      "NASA Space Apps Port Said 1st place",
      "Global Nominee",
      "Risk visualization prototype with seeded demo data"
    ],
    programmingLanguages: ["TypeScript", "Python"],
    contentLanguages: ["English"],
    features: [
      "City search and flood-risk map",
      "IMERG rainfall aggregated over 3, 24 and 72 hours",
      "SAR water-extent overlay (OPERA / Sentinel-1)",
      "Rule-based risk index with Low / Medium / High bands",
      "PDF impact summaries"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://mahmoud-yassin10.github.io/flood-lens-nasa/"
  },
  {
    title: "The True Tutor",
    description:
      "Premium test-prep marketing site: interactive classes, homework and mocks, exclusive materials, and enrollment flows for SAT, ACT, EST, IELTS, AP, and TOEFL—plus free lectures and study resources.",
    tech: ["Education", "Test Prep", "Responsive UI"],
    period: "Live",
    link: `${base}/projects/the-true-tutor`,
    type: "Client Work",
    slug: "the-true-tutor",
    longDescription:
      "Public-facing site for a premium tutoring brand: it communicates the full value proposition—interactive sessions, daily homework with feedback, exam-style mocks, proprietary materials, private follow-up, and guardian communication—while routing families into a structured enrollment flow. Free lecture and material sections showcase quality before signup.",
    skillsUsed: ["Responsive layout", "Landing UX", "Forms & validation", "Content sections", "Performance"],
    responsibilities: [
      "Structured the marketing narrative and section hierarchy for parents and students",
      "Built responsive layouts for features, testimonials, and resource previews",
      "Implemented enrollment forms with grade and exam selections",
      "Connected CTAs and resource blocks to the client’s intake process",
      "Tuned readability, spacing, and mobile-first navigation"
    ],
    highlights: [
      "Multi-exam positioning (SAT, ACT, EST, IELTS, AP, TOEFL)",
      "Clear feature grid and trust-led enrollment path",
      "Free lectures and materials surfaced for discovery"
    ],
    programmingLanguages: ["JavaScript", "HTML", "CSS"],
    contentLanguages: ["English"],
    features: [
      "Marketing narrative with feature grid (classes, homework, mocks, materials)",
      "Enrollment form with grade, school, exam type, and schedule fields",
      "Free lectures and downloadable materials sections",
      "Contact and intake-oriented CTAs",
      "Responsive layout for parents and students on mobile"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://thetruetutor.com"
  },
  {
    title: "True Tutor — Learning Platform",
    description:
      "A live test-prep platform for SAT, ACT, EST and IELTS: quizzes, mocks, protected video lectures, progress tools, AI vocabulary help, and WhatsApp and Telegram automation. I joined it in February 2026 and have been its sole active developer since May 2026.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Cloudflare R2", "Vercel"],
    period: "Feb 2026 – Present",
    link: `${base}/projects/true-tutor-learning-platform`,
    type: "Client Work",
    slug: "true-tutor-learning-platform",
    longDescription:
      "Production learning platform with student, parent, admin and staff portals. I joined an existing codebase and built or extended quiz publishing, EST templates, drafts, Reading Radar, Lecture Radar, AI vocabulary explanations, WhatsApp registration and reports, student-facing screens, and video and deployment fixes. Platform-wide totals describe the whole platform, not only my work.",
    skillsUsed: ["Next.js", "TypeScript", "PostgreSQL and Prisma", "Authorization and access rules", "Messaging automation", "Production debugging"],
    responsibilities: [
      "Built and extended quiz publishing, drafts and EST templates",
      "Built Reading Radar, Lecture Radar and AI vocabulary tools",
      "Built WhatsApp registration and report workflows",
      "Fixed video, PDF, webhook and deployment problems",
      "Maintain the platform as its sole active developer"
    ],
    highlights: [
      "5,732 student accounts on the platform (Oct 16, 2026)",
      "87,241 quiz attempts started, all time",
      "121 commits in an April 30 to May 15, 2026 sprint"
    ],
    programmingLanguages: ["TypeScript", "JavaScript", "SQL"],
    contentLanguages: ["English", "Arabic"],
    features: [
      "Role-based student, parent, admin and staff portals",
      "Quiz publishing with group, history and access rules",
      "Reading Radar and Lecture Radar learning tools",
      "Protected video lectures and PDF materials",
      "WhatsApp and Telegram automation",
      "Course progress and mistakes practice"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://new.thetruetutor.com"
  },
  {
    title: "Mr. Ghonem — Mathematics",
    description:
      "SAT, ACT, and EST math preparation for students in Port Said—structured lectures, quizzes with feedback, group sessions, and timed mock exams in a Bluebook-style flow.",
    tech: ["Education", "Web App", "Vercel"],
    period: "Live",
    link: `${base}/projects/mr-ghonem-mathematics`,
    type: "Client Work",
    slug: "mr-ghonem-mathematics",
    longDescription:
      "Focused math prep product for high-stakes exams: course tiles for SAT, ACT, and EST Math, credibility-led hero, and clear reasons to join—structured lectures, large practice banks with feedback, small-group sessions, and timed mocks modeled on real exam conditions.",
    skillsUsed: ["Product landing", "Auth-ready layout", "Course modules UI", "Conversion-focused copy"],
    responsibilities: [
      "Crafted a concise hero and course grid for three exam tracks",
      "Outlined flows for registration, student login, and group enrollment",
      "Emphasized practice volume, quizzes, and mock-exam differentiation",
      "Delivered a fast, trustworthy experience suitable for Vercel hosting",
      "Aligned visuals and spacing with an education brand"
    ],
    highlights: [
      "SAT / ACT / EST math positioning",
      "Group sessions and Bluebook-style mocks highlighted",
      "Clear join-and-learn calls to action"
    ],
    programmingLanguages: ["TypeScript", "JavaScript", "HTML", "CSS"],
    contentLanguages: ["English", "Arabic"],
    features: [
      "Course tiles for SAT Math, ACT Math, and EST Math",
      "Student registration and login flows",
      "Structured lectures with topic hierarchy",
      "Practice quizzes with instant feedback",
      "Small-group session positioning",
      "Timed mock exams modeled on Bluebook-style testing",
      "Hosted on Vercel for fast global loads"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://mrghonem.vercel.app"
  },
  {
    title: "Fresheria",
    description:
      "A fast, modern marketing site with a clean layout and mobile-first UX for customers.",
    tech: ["Website", "Brand", "Vercel"],
    period: "Live",
    link: `${base}/projects/fresheria`,
    type: "Client Work",
    slug: "fresheria",
    longDescription:
      "Brand-forward marketing site built for speed and clarity: strong first impression, scannable sections, and touch-friendly navigation so visitors get the offer quickly on any device.",
    skillsUsed: ["Marketing layout", "Mobile-first CSS", "Brand consistency", "Performance"],
    responsibilities: [
      "Designed section flow for clarity and quick comprehension",
      "Implemented responsive grids and typography",
      "Optimized for fast loads on Vercel",
      "Aligned visuals with the client’s brand tone"
    ],
    highlights: ["Clean, modern aesthetic", "Mobile-first experience", "Deployment on Vercel"],
    programmingLanguages: ["TypeScript", "JavaScript", "HTML", "CSS"],
    contentLanguages: ["English"],
    features: [
      "Brand-led hero and scannable marketing sections",
      "Mobile-first responsive grid and typography",
      "Fast static delivery via Vercel",
      "Clear CTAs and touch-friendly navigation"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://fresheria.vercel.app"
  },
  {
    title: "Niney Yassin",
    description:
      "A personal website showcasing profile, achievements, and a structured portfolio presentation.",
    tech: ["Personal Site", "Portfolio", "Responsive UI"],
    period: "Live",
    link: `${base}/projects/niney-yassin`,
    type: "Client Work",
    slug: "niney-yassin",
    longDescription:
      "Personal portfolio presence: structured presentation of profile and milestones with a polished, readable layout suited to professional discovery.",
    skillsUsed: ["Portfolio UX", "Typography", "Responsive design", "Content hierarchy"],
    responsibilities: [
      "Organized profile and achievement content for scanability",
      "Built responsive layouts across breakpoints",
      "Balanced imagery and text for a credible personal brand",
      "Ensured navigation and anchors support quick browsing"
    ],
    highlights: ["Structured portfolio narrative", "Professional presentation", "Responsive across devices"],
    programmingLanguages: ["JavaScript", "HTML", "CSS"],
    contentLanguages: ["English"],
    features: [
      "Profile and achievements layout",
      "Portfolio-style sections and anchors",
      "Responsive imagery and typography",
      "Professional personal-brand presentation"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://nineyyassin.com"
  },
  {
    title: "RevWear",
    description:
      "A brand storefront focused on product presentation, clear navigation, and conversion-ready pages.",
    tech: ["Ecommerce", "Storefront", "UX"],
    period: "Live",
    link: `${base}/projects/revwear`,
    type: "Client Work",
    slug: "revwear",
    longDescription:
      "Commerce-focused storefront emphasizing products, categories, and smooth paths to purchase—clear hierarchy, trustworthy checkout cues, and consistent brand presentation.",
    skillsUsed: ["Ecommerce UX", "Product grids", "Navigation patterns", "CTA placement"],
    responsibilities: [
      "Structured catalog and product discovery patterns",
      "Tuned navigation for browsing and conversion",
      "Ensured product imagery and detail areas read well on mobile",
      "Applied consistent spacing and hierarchy across shop pages"
    ],
    highlights: ["Product-led layout", "Conversion-oriented structure", "Cohesive brand feel"],
    programmingLanguages: ["JavaScript", "HTML", "CSS", "Liquid"],
    contentLanguages: ["English"],
    features: [
      "Product grids and collection-style navigation",
      "Product detail views and purchase-oriented layout",
      "Checkout-trust patterns and consistent brand styling",
      "Mobile-optimized shopping flows"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://revwear.store"
  },
  {
    title: "MODX Egypt",
    description:
      "Premium fashion ecommerce: curated collections and featured products, bilingual presentation, newsletter signup, and trust messaging around shipping, secure checkout, and returns.",
    tech: ["Ecommerce", "Fashion", "Bilingual UI"],
    period: "Live",
    link: `${base}/projects/modx-egypt`,
    type: "Client Work",
    slug: "modx-egypt",
    longDescription:
      "Fashion retail experience with editorial tone: hero collections, featured products, social proof (customers, catalog breadth), and operational trust—free shipping thresholds, secure payment, quality guarantee, and returns—plus newsletter capture for retention.",
    skillsUsed: ["Shop UX", "Collections", "Trust blocks", "Newsletter integration", "RTL-ready content"],
    responsibilities: [
      "Built collection and featured-product surfaces",
      "Implemented trust row and policy-forward messaging",
      "Supported bilingual copy placement and layout flexibility",
      "Designed newsletter signup for campaigns and launches",
      "Kept visual hierarchy aligned with a premium fashion brand"
    ],
    highlights: [
      "Curated collections and featured catalog",
      "Shipping, security, and returns messaging",
      "Community and newsletter growth hooks"
    ],
    programmingLanguages: ["TypeScript", "JavaScript", "HTML", "CSS"],
    contentLanguages: ["Arabic", "English"],
    features: [
      "Shop and collections browsing",
      "Featured products and editorial-style merchandising",
      "Newsletter signup for campaigns",
      "Trust messaging: shipping thresholds, secure payment, returns",
      "Bilingual-friendly layout (Arabic / English)",
      "RTL-ready content presentation where needed"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://modx-egypt.com",
    livePreviewUrl: "https://www.modx-egypt.com/?lang=en",
    // MODX changes frequently; render the current storefront instead of a cached thumbnail.
    livePreviewRevealDelayMs: 1800
  },
  {
    title: "FemPlus Magazine",
    description:
      "An editorial-style magazine website designed to highlight content and brand identity.",
    tech: ["Editorial", "Magazine", "Brand"],
    period: "Live",
    link: `${base}/projects/femplus-magazine`,
    type: "Client Work",
    slug: "femplus-magazine",
    longDescription:
      "Editorial web presence for a magazine brand: typography and layout that prioritize reading, article discovery, and a distinct visual identity consistent across sections.",
    skillsUsed: ["Editorial design", "Typography", "Article layout", "Brand identity"],
    responsibilities: [
      "Established readable article and index patterns",
      "Applied magazine-style hierarchy and whitespace",
      "Supported the client’s editorial voice through layout",
      "Ensured responsive behavior for long-form content"
    ],
    highlights: ["Editorial readability", "Strong brand presence", "Content-first structure"],
    programmingLanguages: ["JavaScript", "HTML", "CSS"],
    contentLanguages: ["English"],
    features: [
      "Magazine-style article and index templates",
      "Typography-first reading experience",
      "Category and issue-style content discovery",
      "Responsive long-form layouts",
      "Brand-consistent visuals across sections"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://femplusmag.com"
  }
];

const isClientWork = (project: Project) => project.type === "Client Work";

export const projects: Project[] = projectSeeds.map((project) => ({
  ...project,
  programmingLanguages: project.programmingLanguages ?? [],
  contentLanguages: project.contentLanguages ?? [],
  features: project.features ?? [],
  longDescription: project.longDescription ?? fallbackLongDescription,
  skillsUsed: buildSkillsUsed(project),
  highlights: project.highlights && project.highlights.length > 0 ? project.highlights : fallbackHighlights,
  responsibilities:
    project.responsibilities && project.responsibilities.length > 0
      ? project.responsibilities
      : fallbackResponsibilities,
  externalLinkPlaceholder: project.externalLinkPlaceholder ?? "#"
}));

/** Old slugs that still resolve, so previously shared links keep working. */
const legacySlugs: Record<string, string> = {
  "ai-var-for-squash": "squashvar"
};

export const getProjectBySlug = (slug: string) => {
  const canonical = legacySlugs[slug] ?? slug;
  return projects.find((project) => project.slug === canonical);
};

/** Home page & Work → Projects tab (excludes client deliveries). */
export const technicalProjects = projects.filter((p) => !isClientWork(p));

/** Work → Client Work tab — detail pages `/projects/:slug`, live link on each case study. */
export const clientProjects = projects.filter(isClientWork);

/** Evidence-backed projects selected for the temporary admissions release. */
export const admissionsProjects = [
  "squashvar", "flousy-ai-financial-planner", "true-tutor-learning-platform", "flood-lens", "solar-share"
].map((slug) => projects.find((project) => project.slug === slug)!);
