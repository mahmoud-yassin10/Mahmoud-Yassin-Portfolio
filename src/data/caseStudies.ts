import type { ProofPoint } from "@/data/admissions";

/**
 * Long-form write-ups for the admissions view of /projects/:slug.
 * Source: the Five-Project Evidence Dossier (Nov 3, 2026). Keep each claim at the strength
 * the dossier gives it: REPORTED figures stay labelled as reported, platform-wide totals are
 * never described as personal output, and nothing here claims more than the evidence does.
 * Every section is optional, so unfinished pieces never render as placeholders.
 */
export type CaseStudy = {
  slug: string;
  tagline: string;
  facts: ProofPoint[];
  role: string;
  problem: string;
  approach: Array<{ title: string; body: string }>;
  turningPoint?: { title: string; body: string };
  results: string[];
  limits: string[];
  status?: string;
  links?: Array<{ label: string; href: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "squashvar",
    tagline: "An assistant referee for squash that uses one ordinary camera, and says NO_DECISION when it cannot be sure.",
    facts: [
      { value: "0.911", label: "mAP@50, YOLOv8-S ball detector" },
      { value: "3,001 / 6,277", label: "training images / labelled balls" },
      { value: "3,000", label: "frames in a separate match benchmark" },
      { value: "Submitted", label: "revised manuscript, awaiting review" }
    ],
    role: "I built the detector fine-tuning, tracking, court geometry, impact detection and evaluation myself, using existing tools (YOLOv8, BoT-SORT, OpenCV). Rijul Gupta mentored the research and is a coauthor on the manuscript, and I had some help with annotation.",
    problem:
      "Fast balls, players blocking the camera, reflections and wall seams make squash line calls hard, and multi-camera officiating systems are out of reach for smaller venues. I wanted to see how far one ordinary camera could go, and to give referees evidence they can look at, not a verdict they have to trust.",
    approach: [
      {
        title: "Detect the ball",
        body: "A YOLOv8-S model, fine-tuned on a dataset I labelled with some annotation help (3,001 images, 6,277 balls), finds the ball in each frame. A smaller YOLOv8-N model is the baseline."
      },
      {
        title: "Track it through the rally",
        body: "BoT-SORT links detections across 1080p, 60 FPS footage so the ball keeps one identity from frame to frame."
      },
      {
        title: "Map it onto the court",
        body: "Four calibrated planes (front wall, floor, left and right walls) each get a homography from four known points, so pixel positions become centimeters on the court."
      },
      {
        title: "Find the impacts",
        body: "Smoothed velocity and acceleration, sudden changes of direction and distance to a surface mark where the ball bounced."
      },
      {
        title: "Call it, or abstain",
        body: "Each mapped impact is compared with the court lines. Within 2 cm of a line the system returns NO_DECISION instead of IN or OUT."
      }
    ],
    turningPoint: {
      title: "Choosing to say NO_DECISION",
      body:
        "One broadcast-style camera cannot measure depth exactly, so a ball landing close to a line cannot honestly be called either way. I made abstention part of the design: near a boundary the system declines to answer. The 2 cm band is a design choice I have not yet backed with a measured estimate of calibration uncertainty."
    },
    results: [
      "Detector precision 0.937 at 1920 px, and mAP@50 0.911 at 1280 px. These are two different settings.",
      "On a 3,000-frame benchmark with 78 annotated impacts, impact-event F1 was 0.729 when ignoring which surface was hit, and 0.636 when the surface also had to match.",
      "Per-surface F1: front wall 0.847, floor 0.571, left wall 0.267, right wall 0.000."
    ],
    limits: [
      "Line-call accuracy is not measured yet. The F1 scores measure whether an impact was found at the right time, not whether IN or OUT was correct.",
      "The side walls are weak, and the benchmark has only 11 left-wall and 5 right-wall events.",
      "Journal reviewers asked for quantitative line-call accuracy, independent footage and better calibration evidence. I revised and resubmitted, and I am waiting on the review.",
      "It is a research prototype, not a production officiating system."
    ],
    status: "Mentored by Rijul Gupta through the Lumiere research program. Early, exploratory conversations with the Egyptian Squash Federation, with no adoption.",
    links: [
      { label: "Source code", href: "https://github.com/mahmoud-yassin10/SquashVAR" },
      { label: "Figures", href: "https://github.com/mahmoud-yassin10/SquashVAR/tree/main/figs" }
    ]
  },
  {
    slug: "flousy-ai-financial-planner",
    tagline: "A budgeting app built around the question people actually ask: can I afford this?",
    facts: [
      { value: "306", label: "transactions tracked (reported)" },
      { value: "~100", label: "users (reported)" },
      { value: "Arabic / English", label: "bilingual interface with RTL" },
      { value: "Android", label: "released on Google Play (reported)" }
    ],
    role: "I conceived, designed and built Flousy alone: the Flutter app, the Firebase backend, the SMS import and the AI planner. Outside users gave feedback, and there are no co-developers.",
    problem:
      "Logging every expense by hand is a chore, money obligations are scattered, and a chart of past spending does not answer a practical question like whether a purchase fits this month.",
    approach: [
      {
        title: "Import from bank SMS",
        body: "On Android, Flousy reads Egyptian bank messages, matches them to accounts and asks for confirmation. Duplicates are suppressed, wrong detections can be reported, and a background job retries after the app is closed."
      },
      {
        title: "Plan with AI, with guardrails",
        body: "Cloud Functions ask Gemini for a monthly budget as structured output, using bills, installments, subscriptions, debt, savings and goals. The result is validated and retried, with a 50/30/20 fallback. Zero income does not get an invented plan."
      },
      {
        title: "Answer the real question",
        body: "Safe to Spend shows what is left after commitments. Can I Spend? checks a specific purchase against the budget. Both came from what users said they needed."
      },
      {
        title: "Work in two languages",
        body: "The interface is Arabic and English with right-to-left layout, voice capture, reminders, and Firebase sign-in with per-user data."
      }
    ],
    turningPoint: {
      title: "A budget bug that taught me to ask the user",
      body:
        "On August 9, 2026 I documented a bug: when the planner re-adjusted a budget and gave a category zero, the category could be dropped for good without the user choosing that. My write-up argues the app should act on what the user explicitly says, not infer an exclusion from a zero."
    },
    results: [
      "306 transactions tracked, September to October 2026 (reported)",
      "About 100 users (reported)",
      "40 of 40 backend tests and 137 of 137 Flutter tests passing in a July 2026 baseline"
    ],
    limits: [
      "I do not have verified installs, retention or revenue figures yet.",
      "User and transaction counts come from my own reports of the app's data, not an independent audit.",
      "SMS import works on Android only."
    ],
    links: [{ label: "Visit Flousy", href: "https://flousy.mahmoud-yassin.com" }]
  },
  {
    slug: "true-tutor-learning-platform",
    tagline: "A live test-prep platform with thousands of students, which I develop and maintain.",
    facts: [
      { value: "5,732", label: "student accounts on the platform" },
      { value: "87,241", label: "quiz attempts started, all time" },
      { value: "121", label: "commits in my April 30 to May 15 sprint" },
      { value: "52.3 h", label: "recorded for that sprint" }
    ],
    role: "I joined an existing production platform in February 2026, worked alongside another developer, and have been the sole active developer since May 2026. I did not found or write the whole platform. The platform-wide figures describe the whole platform, not work I produced alone.",
    problem:
      "Running exam prep means managing quizzes, grades, learning gaps, protected videos, class access and parent communication. Done by hand, it is slow and breaks easily.",
    approach: [
      {
        title: "Quizzes that respect who is allowed in",
        body: "Admins publish quizzes. Who can see one depends on the student's group, history rules and access grants. Students start, resume and submit, and each retry is stored as a new attempt."
      },
      {
        title: "Learning tools I added",
        body: "I built or extended quiz publishing, EST templates, drafts, Reading Radar, Lecture Radar and AI vocabulary explanations, plus the student-facing interface."
      },
      {
        title: "Messaging that runs itself",
        body: "WhatsApp handles registration and reminders, Telegram sends staff digests and alerts, and scheduled jobs on Vercel keep it running."
      },
      {
        title: "Keeping production stable",
        body: "I worked on device-specific video and PDF problems, duplicate webhook messages, failed deployments and database migration reliability while shipping features."
      }
    ],
    turningPoint: {
      title: "Making exams survive real life",
      body:
        "Real students lose connection, switch devices and change groups in the middle of an exam. I reworked per-student drafts, quiz access and history rules so an interrupted exam continues where it stopped, and access stays correct when groups change."
    },
    results: [
      "Platform, October 16, 2026: 5,732 student accounts (5,598 active), 14,798 quizzes, 87,241 attempts started and 308 courses",
      "My sprint, April 30 to May 15, 2026: 121 commits, 17,538 lines added and 6,464 removed across 171 files, 52.3 recorded hours"
    ],
    limits: [
      "Platform totals are for the whole platform, not personal output.",
      "The source code is private."
    ],
    links: [{ label: "Visit the platform", href: "https://new.thetruetutor.com" }]
  },
  {
    slug: "flood-lens",
    tagline: "A flood-risk map from NASA Space Apps, and a lesson in not overclaiming.",
    facts: [
      { value: "1st place", label: "NASA Space Apps, Port Said, 2025" },
      { value: "Global Nominee", label: "not a finalist or winner" },
      { value: "5", label: "person team, which I led" },
      { value: "0 to 100", label: "rule-based risk index, not a probability" }
    ],
    role: "I led the five-person team and built the web interface, the data pipeline and the technical pitch.",
    problem:
      "Rainfall records, satellite water observations and terrain data are hard to read together. We wanted to make flood hazard easier to see for communities and decision makers, without claiming more certainty than the data supports.",
    approach: [
      {
        title: "Bring three sources together",
        body: "NASA GPM IMERG rainfall aggregated over 3, 24 and 72 hours, Sentinel-1 radar water observations from OPERA, and SRTM terrain."
      },
      {
        title: "Score the risk",
        body: "A rule-based index combines rain, newly flooded area and low-lying terrain on a 0 to 100 scale: Low below 40, Medium 40 to 69, High 70 and above."
      },
      {
        title: "Put it on a map",
        body: "A React and Leaflet app with city search, flood polygons, risk cards, a radar overlay and downloadable PDF summaries."
      }
    ],
    turningPoint: {
      title: "Dropping the word prediction",
      body:
        "The project has no labelled validation benchmark. I describe it as risk visualization and state when the demo uses seeded data, so viewers can distinguish a working interface from a validated forecasting system."
    },
    results: [
      "First place at the Port Said NASA Space Apps event, 2025",
      "Named a Global Nominee",
      "15 monitored locations configured, including Alexandria and sites along the Blue Nile"
    ],
    limits: [
      "It is not a validated flood-prediction system. There is no labelled benchmark, so accuracy, precision and recall are unknown.",
      "The demo ran on seeded data to keep the map usable. Live NASA access was unreliable, so displayed values are not NASA observations.",
      "The terrain metric (height above nearest drainage) was never finished.",
      "The risk score is on a 0 to 100 scale, but some seeded data and interface code assume 0 to 1. I know about the inconsistency."
    ],
    links: [{ label: "Source code", href: "https://github.com/mahmoud-yassin10/flood-lens-nasa" }]
  },
  {
    slug: "solar-share",
    tagline: "A peer-to-peer solar sharing idea that won Best Idea at the Ignited Hackathon.",
    facts: [
      { value: "Best Idea", label: "Ignited Hackathon, 2025" },
      { value: "Prototype", label: "neighborhood solar-sharing concept" },
      { value: "Sep 2024 to May 2025", label: "development" },
      { value: "Flutter", label: "with JavaScript and Firebase" }
    ],
    role: "I was the founder, developer and project lead: I developed the concept, defined the requirements, built the prototype and prepared the live demo and technical pitch.",
    problem:
      "Some homes with solar panels produce more power than they use, while their neighbors could use cheaper, cleaner electricity. The idea was to let nearby households share that surplus.",
    approach: [
      {
        title: "Share at neighborhood scale",
        body: "I chose peer-to-peer sharing between nearby households over an app that only monitors one home."
      },
      {
        title: "Build a working prototype",
        body: "A Flutter app, alongside a JavaScript and Firebase implementation, to show the idea end to end."
      },
      {
        title: "Pitch it live",
        body: "I prepared a live demonstration and technical pitch for the competition."
      }
    ],
    results: [
      "Ignited Hackathon Best Idea Award, 2025",
      "Live prototype demonstration and technical pitch"
    ],
    limits: [
      "It is a prototype and an award-winning concept, not an operating energy network.",
      "There is no real electricity exchange, meter integration, payments or user base."
    ]
  }
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
