export type CardNumber = { value: string; label: string; labelAr: string };

export type ProjectCard = {
  slug: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  blurb: string;
  blurbAr: string;
  /** Real preview image under /images/portfolio. Cards without one show an icon tile. */
  image?: string;
  imageAlt: string;
  imageAltAr: string;
  imageKind: "wide" | "phone";
  numbers: CardNumber[];
  featured?: boolean;
};

/** Home-page project cards. Numbers keep the qualifiers the case studies use. */
export const projectCards: ProjectCard[] = [
  {
    slug: "squashvar",
    name: "SquashVAR", nameAr: "SquashVAR",
    category: "Computer vision / Research", categoryAr: "الرؤية الحاسوبية / البحث",
    blurb: "A one-camera assistant referee for squash that says NO_DECISION when a call is too close to make honestly. Revised manuscript submitted.",
    blurbAr: "مساعد حكم لاسكواش بكاميرا واحدة، بيقول NO_DECISION لما الكرة قريبة من الخط ومينفعش يحكم بأمانة. النسخة المنقحة من البحث اتقدمت.",
    image: "squashvar-court.webp",
    imageAlt: "Actual SquashVAR output showing calibrated court planes and the ball trajectory",
    imageAltAr: "إطار فعلي من SquashVAR بيعرض معايرة الملعب وتتبع الكرة",
    imageKind: "wide",
    numbers: [
      { value: "0.911", label: "detector mAP@50", labelAr: "mAP@50 للكاشف" },
      { value: "3,001", label: "training images", labelAr: "صورة تدريب" }
    ],
    featured: true
  },
  {
    slug: "flousy-ai-financial-planner",
    name: "Flousy", nameAr: "فلوسي",
    category: "Mobile app / AI", categoryAr: "تطبيق موبايل / ذكاء اصطناعي",
    blurb: "AI budgets and bank-SMS import so you can ask whether you can afford something.",
    blurbAr: "ميزانيات بالذكاء الاصطناعي واستيراد من رسائل البنوك، عشان تسأل إذا كنت تقدر تشتري حاجة.",
    image: "flousy-activity.webp",
    imageAlt: "Flousy Activity screen from the app, showing imported bank transactions",
    imageAltAr: "شاشة النشاط في فلوسي بتعرض معاملات مستوردة من رسائل البنك",
    imageKind: "phone",
    numbers: [{ value: "EGP 259,520", label: "tracked, reported", labelAr: "مسجلة، حسب تقاريري" }]
  },
  {
    slug: "true-tutor-learning-platform",
    name: "TrueTutor", nameAr: "TrueTutor",
    category: "Live platform", categoryAr: "منصة شغالة",
    blurb: "A live test-prep platform I maintain as its sole active developer.",
    blurbAr: "منصة تحضير امتحانات شغالة، وأنا المطوّر النشط الوحيد ليها.",
    image: "truetutor.webp",
    imageAlt: "The TrueTutor platform home page", imageAltAr: "الصفحة الرئيسية لمنصة TrueTutor",
    imageKind: "wide",
    numbers: [{ value: "5,732", label: "platform accounts", labelAr: "حساب على المنصة" }]
  },
  {
    slug: "flood-lens",
    name: "Flood Lens", nameAr: "Flood Lens",
    category: "NASA Space Apps", categoryAr: "NASA Space Apps",
    blurb: "A flood-risk map. Port Said 1st place and Global Nominee.",
    blurbAr: "خريطة لمخاطر الفيضان. الأول في بورسعيد وGlobal Nominee.",
    imageAlt: "Flood Lens risk map", imageAltAr: "خريطة مخاطر الفيضان",
    imageKind: "wide",
    numbers: [{ value: "1st", label: "Port Said", labelAr: "بورسعيد" }]
  },
  {
    slug: "solar-share",
    name: "Solar Share", nameAr: "Solar Share",
    category: "Hackathon prototype", categoryAr: "نموذج هاكاثون",
    blurb: "Peer-to-peer solar sharing. Ignited Best Idea Award.",
    blurbAr: "مشاركة الطاقة الشمسية بين الجيران. جائزة أفضل فكرة في Ignited.",
    imageAlt: "Solar Share", imageAltAr: "Solar Share",
    imageKind: "wide",
    numbers: [{ value: "Best Idea", label: "Ignited, 2025", labelAr: "Ignited، ٢٠٢٥" }]
  }
];
