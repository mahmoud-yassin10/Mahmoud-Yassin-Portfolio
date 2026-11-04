export type TimelineNumber = { value: string; label: string; labelAr: string };

export type TimelineEntry = {
  id: string;
  /** Short label on the rail. */
  rail: string; railAr: string;
  period: string; periodAr: string;
  title: string; titleAr: string;
  role: string; roleAr: string;
  summary: string; summaryAr: string;
  bullets: string[]; bulletsAr: string[];
  tags: string[];
  numbers: TimelineNumber[];
  href?: string;
};

/** Ordered by start date. Keep every claim at the strength of the evidence dossier. */
export const timeline: TimelineEntry[] = [
  {
    id: "freelance",
    rail: "May 2023", railAr: "مايو ٢٠٢٣",
    period: "May 2023 to present", periodAr: "من مايو ٢٠٢٣ لحد دلوقتي",
    title: "Freelance software", titleAr: "شغل فريلانس",
    role: "Independent developer", roleAr: "مطوّر مستقل",
    summary: "Started building websites and apps for clients.", summaryAr: "بدأت أبني مواقع وتطبيقات للعملاء.",
    bullets: ["Turned client requirements into working features", "Shipped, fixed and maintained sites and apps", "Learned to support software after launch"],
    bulletsAr: ["حوّلت متطلبات العملاء لمميزات شغالة", "نشرت وصلّحت وصنت مواقع وتطبيقات", "اتعلمت أدعم البرنامج بعد الإطلاق"],
    tags: ["Websites", "Apps", "Maintenance"],
    numbers: []
  },
  {
    id: "solar-share",
    rail: "Sep 2024", railAr: "سبتمبر ٢٠٢٤",
    period: "Sep 2024 to May 2025", periodAr: "سبتمبر ٢٠٢٤ لمايو ٢٠٢٥",
    title: "Solar Share", titleAr: "Solar Share",
    role: "Founder, developer and project lead", roleAr: "مؤسس ومطوّر وقائد المشروع",
    summary: "A prototype for sharing surplus solar power between neighbors.", summaryAr: "نموذج لمشاركة فائض الطاقة الشمسية بين الجيران.",
    bullets: ["Defined the requirements and built the prototype", "Flutter app with a JavaScript and Firebase implementation", "Pitched it live at the Ignited Hackathon"],
    bulletsAr: ["حددت المتطلبات وبنيت النموذج", "تطبيق Flutter بجانب تنفيذ بـJavaScript وFirebase", "قدمته مباشرة في هاكاثون Ignited"],
    tags: ["Flutter", "Firebase", "Hackathon"],
    numbers: [{ value: "Best Idea", label: "Ignited Hackathon, 2025", labelAr: "هاكاثون Ignited، ٢٠٢٥" }],
    href: "/projects/solar-share"
  },
  {
    id: "flousy",
    rail: "Jan 2025", railAr: "يناير ٢٠٢٥",
    period: "Jan 2025 to present", periodAr: "من يناير ٢٠٢٥ لحد دلوقتي",
    title: "Flousy", titleAr: "فلوسي",
    role: "Founder and independent developer", roleAr: "مؤسس ومطوّر مستقل",
    summary: "An AI financial planner built around the question: can I afford this?", summaryAr: "مخطط مالي بالذكاء الاصطناعي مبني على سؤال: أقدر أشتري ده؟",
    bullets: ["Imports Egyptian bank SMS messages on Android", "Budgets built by Gemini with validation and fallbacks", "Safe to Spend and Can I Spend? from user feedback"],
    bulletsAr: ["بيستورد رسائل البنوك المصرية على أندرويد", "ميزانيات من Gemini مع تحقق وبدائل", "Safe to Spend وCan I Spend? من ملاحظات المستخدمين"],
    tags: ["Flutter", "Firebase", "Gemini"],
    numbers: [
      { value: "EGP 259,520", label: "tracked, reported", labelAr: "مسجلة، حسب تقاريري" },
      { value: "306", label: "transactions", labelAr: "معاملة" },
      { value: "~100", label: "users, reported", labelAr: "مستخدم، حسب تقاريري" }
    ],
    href: "/projects/flousy-ai-financial-planner"
  },
  {
    id: "blb",
    rail: "Apr 2025", railAr: "أبريل ٢٠٢٥",
    period: "April to September 2025", periodAr: "أبريل لسبتمبر ٢٠٢٥",
    title: "BLB School Development Team", titleAr: "فريق التطوير في BLB",
    role: "Software development intern, NIS Parents App", roleAr: "متدرب تطوير برمجيات، تطبيق NIS Parents",
    summary: "An internship on the school's Flutter app for parents.", summaryAr: "تدريب على تطبيق Flutter الخاص بالمدرسة لأولياء الأمور.",
    bullets: ["Adjusted features on the existing Flutter app", "Reproduced and fixed bugs, and ran regression tests", "Wrote issue reports and helped keep releases stable"],
    bulletsAr: ["عدّلت مميزات في تطبيق Flutter الموجود", "كررت الأخطاء وصلّحتها وعملت اختبارات انحدار", "كتبت تقارير مشاكل وساعدت في استقرار الإصدارات"],
    tags: ["Flutter", "Testing", "Bug fixing"],
    numbers: []
  },
  {
    id: "squashvar",
    rail: "Sep 2025", railAr: "سبتمبر ٢٠٢٥",
    period: "Sep 2025 to present", periodAr: "من سبتمبر ٢٠٢٥ لحد دلوقتي",
    title: "SquashVAR research", titleAr: "بحث SquashVAR",
    role: "Independent developer and researcher", roleAr: "مطوّر وباحث مستقل",
    summary: "A one-camera assistant referee that abstains when it cannot be sure.", summaryAr: "مساعد حكم بكاميرا واحدة بيمتنع عن الحكم لما مش متأكد.",
    bullets: ["Fine-tuned a YOLOv8-S ball detector and built tracking", "Mapped the ball onto four calibrated court planes", "Revised manuscript submitted and awaiting review"],
    bulletsAr: ["ظبطت كاشف كرة YOLOv8-S وبنيت التتبع", "ربطت الكرة بأربعة أسطح ملعب مُعايرة", "النسخة المنقحة من البحث اتقدمت وبتستنى المراجعة"],
    tags: ["Python", "YOLOv8", "OpenCV"],
    numbers: [
      { value: "0.911", label: "detector mAP@50", labelAr: "mAP@50 للكاشف" },
      { value: "3,001", label: "training images", labelAr: "صورة تدريب" }
    ],
    href: "/projects/squashvar"
  },
  {
    id: "nasa",
    rail: "Oct 2025", railAr: "أكتوبر ٢٠٢٥",
    period: "October 2025", periodAr: "أكتوبر ٢٠٢٥",
    title: "NASA Space Apps: Flood Lens", titleAr: "NASA Space Apps: Flood Lens",
    role: "Team leader and lead developer", roleAr: "قائد الفريق والمطوّر الرئيسي",
    summary: "A flood-risk map built with a five-person team.", summaryAr: "خريطة لمخاطر الفيضان مع فريق من خمسة.",
    bullets: ["Combined rainfall, radar water and terrain data", "Changed the pitch from prediction to risk visualization after a teammate challenged it", "Port Said 1st place and Global Nominee"],
    bulletsAr: ["جمعت بيانات المطر ومياه الرادار والتضاريس", "غيّرنا العرض من توقع لتصوّر مخاطر بعد ما زميل اعترض", "الأول في بورسعيد وGlobal Nominee"],
    tags: ["React", "Python", "NASA data"],
    numbers: [{ value: "1st", label: "Port Said, 2025", labelAr: "بورسعيد، ٢٠٢٥" }, { value: "5", label: "person team", labelAr: "أفراد في الفريق" }],
    href: "/projects/flood-lens"
  },
  {
    id: "truetutor",
    rail: "Feb 2026", railAr: "فبراير ٢٠٢٦",
    period: "Feb 2026 to present", periodAr: "من فبراير ٢٠٢٦ لحد دلوقتي",
    title: "TrueTutor", titleAr: "TrueTutor",
    role: "Full-stack developer, sole active developer since May 2026", roleAr: "مطوّر Full-stack، والمطوّر النشط الوحيد من مايو ٢٠٢٦",
    summary: "Joined a live test-prep platform and now maintain it.", summaryAr: "انضميت لمنصة تحضير امتحانات شغالة وبصونها دلوقتي.",
    bullets: ["Built Reading Radar, Lecture Radar and AI vocabulary tools", "Quiz publishing, drafts, EST templates and WhatsApp registration", "Kept exams working across devices and group changes"],
    bulletsAr: ["بنيت Reading Radar وLecture Radar وأدوات المفردات بالذكاء الاصطناعي", "نشر الكويزات والمسودات وقوالب EST وتسجيل واتساب", "خلّيت الامتحانات تشتغل عبر الأجهزة وتغيير المجموعات"],
    tags: ["Next.js", "PostgreSQL", "Vercel"],
    numbers: [
      { value: "5,732", label: "platform accounts", labelAr: "حساب على المنصة" },
      { value: "87,241", label: "attempts, platform", labelAr: "محاولة على المنصة" },
      { value: "121", label: "commits in my sprint", labelAr: "commit في فترتي" }
    ],
    href: "/projects/true-tutor-learning-platform"
  },
  {
    id: "decodelabs",
    rail: "May 2026", railAr: "مايو ٢٠٢٦",
    period: "May to June 2026", periodAr: "مايو ليونيو ٢٠٢٦",
    title: "DecodeLabs", titleAr: "DecodeLabs",
    role: "Artificial intelligence intern", roleAr: "متدرب ذكاء اصطناعي",
    summary: "An AI internship with applied machine-learning projects.", summaryAr: "تدريب ذكاء اصطناعي بمشاريع تعلّم آلة تطبيقية.",
    bullets: ["Supervised classification and recommender systems", "OCR and rule-based automation", "Python and scikit-learn, comparing approaches with experiments"],
    bulletsAr: ["تصنيف بإشراف وأنظمة توصية", "OCR وأتمتة بقواعد", "Python وscikit-learn ومقارنة الطرق بتجارب"],
    tags: ["Python", "scikit-learn", "OCR"],
    numbers: []
  },
  {
    id: "flyrank",
    rail: "Jul 2026", railAr: "يوليو ٢٠٢٦",
    period: "July 2026", periodAr: "يوليو ٢٠٢٦",
    title: "FlyRank AI", titleAr: "FlyRank AI",
    role: "Artificial intelligence intern", roleAr: "متدرب ذكاء اصطناعي",
    summary: "A summer AI internship.", summaryAr: "تدريب ذكاء اصطناعي صيفي.",
    bullets: ["An AI internship in July 2026"],
    bulletsAr: ["تدريب ذكاء اصطناعي في يوليو ٢٠٢٦"],
    tags: ["AI"],
    numbers: []
  }
];
