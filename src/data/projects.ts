export type Project = {
  title: string;
  description: string;
  tech: string[];
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
};

export type ProjectTileData = Pick<Project, "title" | "description" | "tech" | "period" | "link" | "type"> & {
  slug?: string;
};

type ProjectSeed = Omit<
  Project,
  "longDescription" | "skillsUsed" | "responsibilities" | "highlights" | "externalLinkPlaceholder"
> &
  Partial<Pick<Project, "longDescription" | "skillsUsed" | "responsibilities" | "highlights" | "externalLinkPlaceholder">>;

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
    description: "AI-powered financial planning app helping Egyptian families navigate inflation. Features expense tracking, category budgets, goal setting, bill reminders, and bilingual (AR/EN) UI. Publishing soon on Play Store.",
    tech: ["Flutter", "Firebase Auth", "AI/ML", "Git", "Dart"],
    period: "Jan 2025 \u2013 Present",
    link: `${base}/projects/flousy-ai-financial-planner`,
    type: "Mobile App",
    slug: "flousy-ai-financial-planner",
    longDescription: "AI-powered financial planning app designed for Egyptian families navigating inflation. It combines expense tracking, budgets, goals, and bill reminders with a bilingual interface to make day-to-day planning simple and actionable.",
    skillsUsed: ["Flutter", "Dart", "Firebase Authentication", "Firestore", "UI/UX", "State management"],
    responsibilities: [
      "Defined core product scope and UX flows",
      "Built Flutter UI and navigation structure",
      "Implemented authentication and data models",
      "Integrated budgeting, goals, and reminders",
      "Tested and debugged critical flows"
    ],
    highlights: [
      "Bilingual AR/EN interface",
      "Expense tracking with budgets and goals",
      "Preparing for Play Store release"
    ],
    externalLinkPlaceholder: "#",
    externalLink: "https://flousy.mahmoud-yassin.com"
  },
  {
    title: "AI VAR for Squash",
    description: "Computer vision-based officiating system detecting 'in' vs 'out' shots on front and side walls, tracking ball bounces and player movement. Research paper in progress for sports-technology journal.",
    tech: ["Python", "OpenCV", "ML/CV", "Video Analysis"],
    period: "Aug 2025 \u2013 Present",
    link: `${base}/projects/ai-var-for-squash`,
    type: "Research",
    slug: "ai-var-for-squash",
    longDescription: "Computer vision research prototype for automated officiating in squash. It tracks ball trajectories, bounces, and player movement to classify in/out events and create reviewable clips.",
    skillsUsed: ["Python", "OpenCV", "Computer Vision", "Machine Learning", "Video analysis"],
    responsibilities: [
      "Collected and labeled match footage",
      "Built detection and tracking pipeline",
      "Designed evaluation metrics",
      "Optimized accuracy and latency",
      "Prepared research documentation"
    ],
    highlights: [
      "Automated in/out classification prototype",
      "Reviewable clips for officiating",
      "Research paper in progress"
    ],
    externalLinkPlaceholder: "#"
  },
  {
    title: "Solar Share",
    description: "Peer-to-peer solar energy marketplace enabling households to share surplus renewable power. Won Best Idea at Ignited Hackathon with +2M virtual funding. Promotes community sustainability.",
    tech: ["JavaScript", "Firebase", "Prototype", "Maps API"],
    period: "Sep 2024 \u2013 May 2025",
    link: `${base}/projects/solar-share`,
    type: "Platform",
    slug: "solar-share",
    longDescription: "Prototype marketplace for households to share or sell surplus solar energy. Focused on discovery, listings, and a clear transaction flow to promote community sustainability.",
    skillsUsed: ["JavaScript", "Firebase", "Maps API", "Prototyping", "UI design"],
    responsibilities: [
      "Designed user flows and wireframes",
      "Built front-end prototype and screens",
      "Integrated map-based discovery",
      "Prepared pitch and demo materials"
    ],
    highlights: [
      "Won Best Idea at Ignited Hackathon",
      "Secured +2M virtual funding",
      "Promoted community energy sharing"
    ],
    externalLinkPlaceholder: "#"
  },
  {
    title: "Flood Lens",
    description: "NASA Space Apps Port Said 1st place + Global Nominee - flood-risk mapping using NASA rainfall + SAR + terrain data.",
    tech: ["NASA Space Apps", "Computer Vision", "ML", "GIS", "React"],
    period: "Oct 2025",
    link: `${base}/projects/flood-lens`,
    type: "Web App",
    slug: "flood-lens",
    longDescription: "Web app that merges NASA rainfall data (IMERG), SAR imagery (OPERA), and terrain models (DEM) to map flood risk across regions. Built for NASA Space Apps to enable fast, global risk visualization.",
    skillsUsed: ["React", "GIS", "NASA APIs", "Data visualization", "Computer Vision"],
    responsibilities: [
      "Integrated NASA datasets and sources",
      "Built risk scoring and mapping logic",
      "Created interactive UI and charts",
      "Coordinated research and presentation"
    ],
    highlights: [
      "NASA Space Apps Port Said 1st place",
      "Global nominee",
      "Interactive flood-risk map"
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
    externalLinkPlaceholder: "#",
    externalLink: "https://thetruetutor.com"
  },
  {
    title: "True Tutor — Learning Platform",
    description:
      "Full student, parent, and admin experience: English exam coaching (SAT, ACT, IELTS, EST), live classes, practice, progress analytics, weekly parent updates, registration, and resource hubs.",
    tech: ["EdTech", "Portals", "Web App"],
    period: "Live",
    link: `${base}/projects/true-tutor-learning-platform`,
    type: "Client Work",
    slug: "true-tutor-learning-platform",
    longDescription:
      "A comprehensive learning hub alongside the main marketing site: separate entry points for parents, students, and admins, onboarding that walks families from registration through assessment and a personalized plan, and rich marketing content—stats, instructor story, FAQs, testimonials, and free video/PDF starters—for English exam preparation.",
    skillsUsed: ["Multi-role UX", "Registration flows", "Content architecture", "Accessibility", "Analytics-ready layout"],
    responsibilities: [
      "Designed portal entry points and role-aware navigation",
      "Built long-form landing sections (how it works, resources, FAQ, testimonials)",
      "Implemented multi-step registration aligned with academic and exam fields",
      "Integrated parent-facing trust signals and WhatsApp contact paths",
      "Ensured bilingual-friendly structure and readable typography"
    ],
    highlights: [
      "Student, parent, and admin pathways",
      "Free lecture and PDF previews for trust and SEO",
      "Registration and consult CTAs tuned for mobile families"
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
    externalLinkPlaceholder: "#",
    externalLink: "https://modx-egypt.com"
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
    externalLinkPlaceholder: "#",
    externalLink: "https://femplusmag.com"
  }
];

const isClientWork = (project: Project) => project.type === "Client Work";

export const projects: Project[] = projectSeeds.map((project) => ({
  ...project,
  longDescription: project.longDescription ?? fallbackLongDescription,
  skillsUsed: buildSkillsUsed(project),
  highlights: project.highlights && project.highlights.length > 0 ? project.highlights : fallbackHighlights,
  responsibilities:
    project.responsibilities && project.responsibilities.length > 0
      ? project.responsibilities
      : fallbackResponsibilities,
  externalLinkPlaceholder: project.externalLinkPlaceholder ?? "#"
}));

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

/** Home page & Work → Projects tab (excludes client deliveries). */
export const technicalProjects = projects.filter((p) => !isClientWork(p));

/** Work → Client Work tab — detail pages `/projects/:slug`, live link on each case study. */
export const clientProjects = projects.filter(isClientWork);
