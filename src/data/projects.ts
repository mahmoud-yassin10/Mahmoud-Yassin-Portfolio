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
    externalLinkPlaceholder: "#"
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
  }
];

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
