/**
 * Single source of truth for the admissions view of the site.
 * Wording mirrors the submitted activities & honors lists. Do not add figures that are
 * not in those lists. Items the applicant has marked unverified are intentionally left out
 * (BLB Cup, Cognia, peer-tutoring score estimate).
 */

export type ProofPoint = { value: string; label: string };

export const admissionsProof: ProofPoint[] = [
  { value: "USACO Platinum", label: "February 2026" },
  { value: "5,732", label: "TrueTutor student accounts, Oct 16, 2026" },
  { value: "0.911", label: "mAP@50, SquashVAR ball detector" },
  { value: "1.37%", label: "selected for JPLP: 100 of 7,315" }
];

export type FeaturedStory = {
  slug: string;
  name: string;
  role: string;
  problem: string;
  built: string;
  evidence: string[];
};

export const featuredStories: FeaturedStory[] = [
  {
    slug: "squashvar",
    name: "SquashVAR",
    role: "Independent developer & researcher",
    problem: "A close call in squash is decided in a split second, with nothing to review.",
    built:
      "A single-camera, geometry-aware assistant referee that maps the ball onto a calibrated court and says NO_DECISION when a call is too close to make honestly.",
    evidence: [
      "YOLOv8-S ball detector, 0.911 mAP@50",
      "3,001 training images, 6,277 labelled balls",
      "Revised manuscript submitted, awaiting review",
      "Mentored through the Lumiere research program"
    ]
  },
  {
    slug: "flousy-ai-financial-planner",
    name: "Flousy",
    role: "Founder & independent developer",
    problem: "Spending charts show where money went, but not what is safe to spend next.",
    built:
      "A bilingual AI financial planner with budgets built by Gemini and automatic transaction import from Egyptian bank SMS messages.",
    evidence: [
      "306 transactions tracked (reported)",
      "About 100 users (reported)",
      "Android release on Google Play (reported)"
    ]
  },
  {
    slug: "true-tutor-learning-platform",
    name: "TrueTutor",
    role: "Full-stack developer, sole active developer since May 2026",
    problem: "Running exam prep means managing quizzes, access, progress and parent communication, which is slow by hand.",
    built:
      "I joined a live production platform in February 2026 and built quiz publishing, Reading Radar, Lecture Radar, AI vocabulary tools and WhatsApp workflows, and I maintain it.",
    evidence: [
      "Platform, Oct 16, 2026: 5,732 student accounts and 87,241 attempts",
      "My sprint: 121 commits between April 30 and May 15, 2026",
      "Platform totals are not personal output"
    ]
  }
];

export type ActivityGroup = {
  id: string;
  title: string;
  blurb: string;
  items: Array<{ name: string; role: string; detail: string }>;
};

export const activityGroups: ActivityGroup[] = [
  {
    id: "build",
    title: "Build",
    blurb: "Software I built, shipped and maintained.",
    items: [
      {
        name: "TrueTutor",
        role: "Full-stack developer",
        detail: "Joined a live EdTech platform in February 2026 and have been its sole active developer since May; October 16, 2026 platform totals are 5,732 student accounts and 87,241 quiz attempts."
      },
      {
        name: "Flousy",
        role: "Founder & independent developer",
        detail: "AI financial planner with bank-SMS import; 306 transactions tracked (reported)."
      },
      {
        name: "Freelance software development",
        role: "Independent developer",
        detail: "Business websites and apps built and maintained for clients, from requirements to deployment."
      },
      {
        name: "NIS Parents App",
        role: "Software development intern",
        detail: "Bug fixes, testing, improvements and release support on the production school-family app."
      },
      {
        name: "MODX",
        role: "Freelance full-stack developer, sole developer",
        detail: "Offline-first retail POS and storefront: a Windows desktop app (C#/.NET, WPF, SQLite) that syncs with an ASP.NET Core and PostgreSQL backend, plus a Next.js storefront. April to June 2026."
      },
      {
        name: "Solar Share",
        role: "Founder, developer & project lead",
        detail: "Flutter and Firebase solar-sharing prototype; Best Idea Award at the Ignited Hackathon."
      }
    ]
  },
  {
    id: "research",
    title: "Research & competition",
    blurb: "Open questions, tested against data.",
    items: [
      {
        name: "SquashVAR / Lumiere Research",
        role: "Independent developer & researcher",
        detail: "Single-camera, geometry-aware squash officiating assistant; 0.911 mAP@50 detector. Revised manuscript submitted and awaiting review."
      },
      {
        name: "Flood Lens, NASA Space Apps",
        role: "Team leader & lead developer",
        detail: "Led five people building a NASA-data flood-risk visualization; Port Said first place and Global Nominee."
      }
    ]
  },
  {
    id: "teach",
    title: "Teach & lead",
    blurb: "Helping other people get good at things.",
    items: [
      {
        name: "NIS Student Body",
        role: "President",
        detail: "Represented student concerns and coordinated school initiatives."
      },
      {
        name: "NIS Peer Tutoring Program",
        role: "Co-founder & tutor trainer",
        detail: "Co-founded and expanded peer tutoring across seven campuses; recruited and trained student tutors. One report counted 12 tutors supporting about 45 students."
      },
      {
        name: "Schoolhouse.world",
        role: "SAT tutor",
        detail: "16 live SAT sessions for 41 learners in 19 countries."
      },
      {
        name: "SAT tutor assistant",
        role: "Instructional assistant",
        detail: "Created practice sets and mock exams, reviewed mistakes and supported study plans."
      },
      {
        name: "Techno Square",
        role: "Coding and robotics instructor",
        detail: "Taught younger students coding and robotics with Scratch, Python and basic Arduino, June to September 2025."
      },
      {
        name: "CS & AI workshops",
        role: "Workshop instructor",
        detail: "Workshops for the 500+ member EG Scholars community, with assignments and mentoring."
      },
      {
        name: "NTA Junior Presidential Leadership Program",
        role: "Selected participant",
        detail: "21-day residential program; 100 selected from 7,315 applicants; selected for a national TV interview on ONTV."
      },
      {
        name: "El-Nasr Hospital Childhood Cancer Day",
        role: "Co-organizer",
        detail: "Helped coordinate a hospital event for about 50 pediatric patients and 100 attendees."
      }
    ]
  },
  {
    id: "compete",
    title: "Sport",
    blurb: "Squash is behind most of the questions I ask.",
    items: [
      {
        name: "Competitive squash",
        role: "National athlete",
        detail: "Competed from about age 12 to 17; ranked No. 42 in the Egyptian U17 division."
      },
      {
        name: "Youth coaching",
        role: "Coach",
        detail: "Coached young players, including a player ranked Egypt U11 No. 4."
      },
      {
        name: "Karate",
        role: "First-dan black belt, national competitor",
        detail: "Trained and competed from 2012 to 2019 and earned a first-dan black belt."
      }
    ]
  }
];

export type Honor = { title: string; org: string; year: string };

export const honors: Honor[] = [
  { title: "USACO Platinum Division", org: "USA Computing Olympiad", year: "2026" },
  { title: "Finalist, International Computer Science Competition", org: "ICSC", year: "2026" },
  { title: "Onsi Sawiris Scholarship Program, Undergraduate Scholar", org: "Onsi Sawiris Scholarship Program", year: "2026" },
  { title: "Research scholarship and A+ paper evaluation", org: "Lumiere Research Program", year: "2026" },
  { title: "1st place, Port Said, and Global Nominee", org: "NASA International Space Apps Challenge", year: "2025" },
  { title: "Best Idea Award", org: "Ignited Hackathon", year: "2025" },
  { title: "2nd place, regional mathematics", org: "AASTMT / Alabakera", year: "2025" },
  { title: "Finalist", org: "Egyptian Olympiad in Computational Science (EOCS)", year: "" },
  { title: "First place, Special Awards category", org: "NIS Speech Competition", year: "2025" },
  { title: "U17 national No. 42", org: "Egyptian Squash Federation", year: "" }
];
