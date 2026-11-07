export type SkillGroup = "Languages" | "Frameworks" | "Data and cloud" | "AI and vision" | "Engineering practice" | "People and leadership";

export type Skill = { slug: string; name: string; group: SkillGroup; blurb: string };

/** Every skill a work item can list. Skill pages are generated from this plus the items that use each skill. */
export const skillCatalog: Skill[] = [
  { slug: "typescript", name: "TypeScript", group: "Languages", blurb: "Typed JavaScript for web apps, back ends and tooling." },
  { slug: "javascript", name: "JavaScript", group: "Languages", blurb: "Interactive front ends and Node services." },
  { slug: "python", name: "Python", group: "Languages", blurb: "Computer vision, machine learning, APIs and automation." },
  { slug: "dart", name: "Dart", group: "Languages", blurb: "The language behind Flutter apps." },
  { slug: "csharp", name: "C#", group: "Languages", blurb: "Desktop and server software on .NET." },
  { slug: "sql", name: "SQL", group: "Languages", blurb: "Relational data modeling and queries." },
  { slug: "react", name: "React", group: "Frameworks", blurb: "Component-based user interfaces." },
  { slug: "nextjs", name: "Next.js", group: "Frameworks", blurb: "Full-stack React with server rendering and API routes." },
  { slug: "flutter", name: "Flutter", group: "Frameworks", blurb: "One codebase for Android and iOS apps." },
  { slug: "aspnet-core", name: "ASP.NET Core", group: "Frameworks", blurb: "Web APIs and back ends in C#." },
  { slug: "wpf", name: "WPF", group: "Frameworks", blurb: "Windows desktop applications." },
  { slug: "nodejs", name: "Node.js", group: "Frameworks", blurb: "JavaScript on the server." },
  { slug: "tailwind", name: "Tailwind CSS", group: "Frameworks", blurb: "Utility-first styling for consistent interfaces." },
  { slug: "fastapi", name: "FastAPI", group: "Frameworks", blurb: "Python web APIs." },
  { slug: "postgresql", name: "PostgreSQL", group: "Data and cloud", blurb: "The relational database behind most of my back ends." },
  { slug: "sqlite", name: "SQLite", group: "Data and cloud", blurb: "Embedded local storage, including offline-first apps." },
  { slug: "firebase", name: "Firebase", group: "Data and cloud", blurb: "Auth, Firestore and Cloud Functions." },
  { slug: "supabase", name: "Supabase", group: "Data and cloud", blurb: "Postgres with row-level security, storage and edge functions." },
  { slug: "prisma", name: "Prisma", group: "Data and cloud", blurb: "Type-safe database access." },
  { slug: "entity-framework", name: "Entity Framework Core", group: "Data and cloud", blurb: "Data access and migrations for .NET." },
  { slug: "docker", name: "Docker", group: "Data and cloud", blurb: "Containerized services and reproducible deploys." },
  { slug: "vercel", name: "Vercel", group: "Data and cloud", blurb: "Hosting, previews and serverless deployment." },
  { slug: "github-actions", name: "GitHub Actions", group: "Data and cloud", blurb: "CI, deploys, backups and status checks." },
  { slug: "computer-vision", name: "Computer vision", group: "AI and vision", blurb: "Detection, tracking and geometry from video." },
  { slug: "yolo", name: "YOLOv8", group: "AI and vision", blurb: "Object detection, fine-tuned and evaluated." },
  { slug: "machine-learning", name: "Machine learning", group: "AI and vision", blurb: "Classification, forecasting, recommendation and evaluation." },
  { slug: "llm-apps", name: "LLM applications", group: "AI and vision", blurb: "Gemini-backed features with validation and fallbacks." },
  { slug: "human-in-the-loop", name: "Human-in-the-loop AI", group: "AI and vision", blurb: "AI that proposes, and people approve." },
  { slug: "ocr", name: "OCR", group: "AI and vision", blurb: "Reading text from images and receipts." },
  { slug: "geospatial", name: "Geospatial data", group: "AI and vision", blurb: "Satellite, rainfall and terrain data on maps." },
  { slug: "testing", name: "Testing", group: "Engineering practice", blurb: "Unit, integration, widget and regression testing." },
  { slug: "offline-first", name: "Offline-first sync", group: "Engineering practice", blurb: "Apps that keep working without a connection and sync later." },
  { slug: "rest-apis", name: "REST APIs", group: "Engineering practice", blurb: "Designing and consuming HTTP APIs." },
  { slug: "authentication", name: "Authentication and access control", group: "Engineering practice", blurb: "Sign-in, roles and permissions." },
  { slug: "whatsapp", name: "WhatsApp automation", group: "Engineering practice", blurb: "Registration, reminders and reports over WhatsApp." },
  { slug: "i18n", name: "Arabic and RTL", group: "Engineering practice", blurb: "Bilingual interfaces with true right-to-left layout." },
  { slug: "ecommerce", name: "E-commerce", group: "Engineering practice", blurb: "Catalogs, carts, checkout and order management." },
  { slug: "responsive", name: "Responsive design", group: "Engineering practice", blurb: "Interfaces that work from phone to desktop." },
  { slug: "production", name: "Production debugging", group: "Engineering practice", blurb: "Finding and fixing problems in live systems." },
  { slug: "teaching", name: "Teaching and mentoring", group: "People and leadership", blurb: "Helping other people get good at things." },
  { slug: "leadership", name: "Leadership", group: "People and leadership", blurb: "Leading teams, programs and student bodies." },
  { slug: "public-speaking", name: "Public speaking", group: "People and leadership", blurb: "Presenting, pitching and competing on stage." },
  { slug: "community", name: "Community organizing", group: "People and leadership", blurb: "Running events and programs for other people." },
  { slug: "competitive-sport", name: "Competitive sport", group: "People and leadership", blurb: "Discipline and performance under pressure." }
];

export const getSkill = (slug: string) => skillCatalog.find((skill) => skill.slug === slug);
