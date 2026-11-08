/** Copy for the public Flousy landing page (/flousy). Claims stay within what the app does today. */
export type LandingCopy = {
  brand: string;
  nav: { features: string; how: string; privacy: string; faq: string };
  play: string; playShort: string; openWeb: string; secondary: string;
  eyebrow: string; headline: string; headlineAccent: string; sub: string;
  heroNotes: string[];
  askTitle: string; asks: Array<{ q: string; a: string }>;
  showcase: Array<{ id: string; tag: string; title: string; body: string; points: string[]; image: string; alt: string; kind: "phone" | "card" }>;
  gridTitle: string; gridIntro: string; grid: Array<{ icon: string; title: string; body: string }>;
  howTitle: string; howIntro: string; steps: Array<{ title: string; body: string }>;
  privacyTitle: string; privacyIntro: string; privacy: Array<{ title: string; body: string }>; privacyLinks: { policy: string; terms: string; deleteAccount: string; deleteData: string };
  faqTitle: string; faq: Array<{ q: string; a: string }>;
  ctaTitle: string; ctaBody: string;
  footer: { made: string; contact: string; rights: string };
  theme: string; language: string;
};

export const landingCopy: { en: LandingCopy; ar: LandingCopy } = {
  en: {
    brand: "Flousy",
    nav: { features: "Features", how: "How it works", privacy: "Privacy", faq: "FAQ" },
    play: "Get it on Google Play", playShort: "Google Play", openWeb: "Open Flousy", secondary: "See how it works",
    eyebrow: "Personal finance for Egypt",
    headline: "Know what you can", headlineAccent: "safely spend.",
    sub: "Flousy reads your bank messages, builds a monthly plan with AI, and answers the question you ask before every purchase: can I afford this?",
    heroNotes: ["Arabic and English", "Android", "Works with Egyptian bank SMS"],
    askTitle: "Built around the questions you actually ask.",
    asks: [
      { q: "How much is safe to spend today?", a: "Safe to Spend shows what is left after your bills, debts and goals." },
      { q: "Can I spend 500?", a: "Can I Spend? checks the purchase against your plan and the rest of the month." },
      { q: "Where did my money go?", a: "Every bank message becomes a categorized transaction you can confirm." }
    ],
    showcase: [
      { id: "sms", tag: "Automatic tracking", title: "Your bank messages become transactions.", body: "On Android, Flousy recognizes Egyptian bank SMS messages and logs each one for you. No typing, and nothing is added without your confirmation.", points: ["Debit and credit detection with smart categories", "Review detected transactions before they are saved", "Report a wrong detection so it improves", "Voice add for the cash you spend"], image: "activity.webp", alt: "Flousy Activity screen listing transactions imported from bank messages", kind: "phone" },
      { id: "decide", tag: "Decisions", title: "An honest answer before you spend.", body: "Ask Flousy whether a purchase fits. It checks your plan, your cash and how stretched the month is, then tells you in plain words.", points: ["Plan room and cash room, side by side", "A clear verdict, not a wall of numbers", "Safe to Spend for the days between"], image: "can-i-spend.webp", alt: "Flousy Can I Spend card saying this looks okay with plan room, cash room and stress level", kind: "card" },
      { id: "plan", tag: "AI planning", title: "A monthly plan that rebalances itself.", body: "Flousy builds a budget from your income, bills, installments, subscriptions, debts and goals, then helps you rebalance when the month changes.", points: ["Plans are validated before you see them", "Keep removed categories out, cover overspending, protect goals", "Never invents a plan when there is no income"], image: "planner.webp", alt: "Flousy Planner screen with a rebalance this plan sheet", kind: "phone" },
      { id: "assistant", tag: "Flousy AI", title: "Ask about your money. You stay in control.", body: "The assistant answers from your own data. When it suggests a change, like creating a goal, nothing happens until you confirm.", points: ["Suggested questions to start with", "Answers based on your real transactions", "Changes need your confirmation"], image: "assistant.webp", alt: "Flousy AI chat screen with suggested questions", kind: "phone" },
      { id: "insights", tag: "Insights", title: "See the month at a glance.", body: "Budget against spending by category, top spending categories compared with last month, and a score that tracks your habits.", points: ["Total planned, spent and remaining", "Categories against their budgets", "Month-over-month comparison"], image: "analytics.webp", alt: "Flousy Analytics screen with spending by category and budget progress", kind: "phone" }
    ],
    gridTitle: "Everything in one calm place.", gridIntro: "The details that make a money app something you open every day.",
    grid: [
      { icon: "target", title: "Savings goals", body: "Set a target, deposit toward it and watch it fill." },
      { icon: "calendar", title: "Bills and installments", body: "Recurring costs stay visible before they surprise you." },
      { icon: "wallet", title: "Subscriptions and debts", body: "Track what you owe and what renews, in one list." },
      { icon: "bell", title: "Reminders", body: "Know when something is due." },
      { icon: "mic", title: "Voice capture", body: "Say an expense and Flousy adds it." },
      { icon: "languages", title: "Arabic and English", body: "A true right-to-left layout, not a translation." },
      { icon: "moon", title: "Light and dark", body: "Both themes are designed, not inverted." },
      { icon: "chart", title: "Analytics", body: "Clear charts for where your money goes." }
    ],
    howTitle: "Up and running in minutes.", howIntro: "Three steps, and the app does the repetitive part.",
    steps: [
      { title: "Add your basics", body: "Your income, regular bills and goals. That is all Flousy needs to start." },
      { title: "Let your messages flow in", body: "Allow SMS access on Android and bank transactions appear for you to confirm." },
      { title: "Plan and decide", body: "Get a monthly plan, ask Can I Spend?, and rebalance when life changes." }
    ],
    privacyTitle: "Your data, your control.", privacyIntro: "A finance app has to earn trust. Here is how Flousy handles yours.",
    privacy: [
      { title: "Permission first", body: "Flousy reads bank messages only after you allow SMS access, and shows each detection for your confirmation." },
      { title: "Your account, your data", body: "Sign in with email or Google. Your plans, goals and transactions belong to your account." },
      { title: "Delete whenever you want", body: "You can delete your account and data from the app or from the pages below." },
      { title: "AI with guardrails", body: "Plans are validated, and the assistant asks before it changes anything." }
    ],
    privacyLinks: { policy: "Privacy Policy", terms: "Terms and Conditions", deleteAccount: "Delete your account", deleteData: "Delete your data" },
    faqTitle: "Questions, answered.",
    faq: [
      { q: "Where can I get Flousy?", a: "Flousy is available on Android through Google Play." },
      { q: "Does Flousy read all my text messages?", a: "No. It looks for bank transaction messages once you allow SMS access, and it shows each detected transaction for you to confirm. You can turn the permission off at any time in your phone settings." },
      { q: "Will the AI change my budget without asking?", a: "No. The assistant can suggest changes, such as creating a savings goal, but nothing is applied until you confirm." },
      { q: "Is it in Arabic?", a: "Yes. Flousy is fully available in Arabic and English, with a proper right-to-left layout." },
      { q: "How do I delete my account?", a: "Open the delete-account page linked on this site, or delete your account from inside the app. You can also request deletion of just your data." }
    ],
    ctaTitle: "Make your next month more predictable.", ctaBody: "Download Flousy, connect your first bank message and see what you can safely spend.",
    footer: { made: "Built by Mahmoud Yassin in Egypt.", contact: "Contact", rights: "All rights reserved." },
    theme: "Toggle theme", language: "AR"
  },
  ar: {
    brand: "فلوسي",
    nav: { features: "المميزات", how: "إزاي بيشتغل", privacy: "الخصوصية", faq: "أسئلة" },
    play: "حمّله من Google Play", playShort: "Google Play", openWeb: "افتح فلوسي", secondary: "شوف إزاي بيشتغل",
    eyebrow: "تطبيق مالي شخصي لمصر",
    headline: "اعرف تصرف كام", headlineAccent: "بأمان.",
    sub: "فلوسي بيقرأ رسائل البنك، وبيبني خطة شهرية بالذكاء الاصطناعي، وبيجاوب السؤال اللي بتسأله قبل أي شراء: أقدر أشتري ده؟",
    heroNotes: ["عربي وإنجليزي", "أندرويد", "بيشتغل مع رسائل البنوك المصرية"],
    askTitle: "مبني على الأسئلة اللي بتسألها فعلاً.",
    asks: [
      { q: "أصرف كام النهارده بأمان؟", a: "Safe to Spend بيوريك الباقي بعد فواتيرك وديونك وأهدافك." },
      { q: "أقدر أصرف ٥٠٠؟", a: "Can I Spend? بيقارن الشراء بخطتك وباقي الشهر." },
      { q: "فلوسي راحت فين؟", a: "كل رسالة من البنك بتتحول لمعاملة متصنفة تقدر تأكدها." }
    ],
    showcase: [
      { id: "sms", tag: "تتبع تلقائي", title: "رسائل البنك بتتحول لمعاملات.", body: "على أندرويد، فلوسي بيتعرف على رسائل البنوك المصرية وبيسجل كل واحدة. من غير كتابة، ومفيش حاجة بتتضاف من غير تأكيدك.", points: ["اكتشاف الخصم والإيداع مع تصنيف ذكي", "راجع المعاملات المكتشفة قبل ما تتحفظ", "بلّغ عن أي اكتشاف غلط عشان يتحسن", "إضافة بالصوت للكاش اللي بتصرفه"], image: "activity.webp", alt: "شاشة النشاط في فلوسي بتعرض معاملات مستوردة من رسائل البنك", kind: "phone" },
      { id: "decide", tag: "القرارات", title: "إجابة صريحة قبل ما تصرف.", body: "اسأل فلوسي لو الشراء مناسب. بيفحص خطتك وكاشك وضغط الشهر، وبيقولك بكلام بسيط.", points: ["مساحة الخطة ومساحة الكاش جنب بعض", "حكم واضح، مش جدار أرقام", "Safe to Spend للأيام اللي بينهم"], image: "can-i-spend.webp", alt: "كارت Can I Spend في فلوسي بيقول إن الشراء مناسب مع مساحة الخطة والكاش ومستوى الضغط", kind: "card" },
      { id: "plan", tag: "تخطيط بالذكاء الاصطناعي", title: "خطة شهرية بتوازن نفسها.", body: "فلوسي بيبني ميزانية من دخلك وفواتيرك وأقساطك واشتراكاتك وديونك وأهدافك، وبيساعدك توازنها لما الشهر يتغير.", points: ["الخطط بتتراجع قبل ما تشوفها", "استبعد فئات، غطّي التجاوز، احمي أهدافك", "مبيألفش خطة لو مفيش دخل"], image: "planner.webp", alt: "شاشة المخطط في فلوسي مع نافذة إعادة موازنة الخطة", kind: "phone" },
      { id: "assistant", tag: "Flousy AI", title: "اسأل عن فلوسك. والقرار قرارك.", body: "المساعد بيجاوب من بياناتك. لما يقترح تغيير، زي إنشاء هدف، مفيش حاجة بتحصل لحد ما تأكد.", points: ["أسئلة مقترحة تبدأ بيها", "إجابات من معاملاتك الحقيقية", "التغييرات محتاجة تأكيدك"], image: "assistant.webp", alt: "شاشة محادثة Flousy AI بأسئلة مقترحة", kind: "phone" },
      { id: "insights", tag: "التحليلات", title: "شوف الشهر في نظرة.", body: "الميزانية قصاد المصروف لكل فئة، وأعلى الفئات صرفاً مقارنة بالشهر اللي فات، ودرجة بتتابع عاداتك.", points: ["إجمالي المخطط والمصروف والمتبقي", "الفئات قصاد ميزانياتها", "مقارنة شهر بشهر"], image: "analytics.webp", alt: "شاشة التحليلات في فلوسي بالمصروف حسب الفئة وتقدم الميزانية", kind: "phone" }
    ],
    gridTitle: "كل حاجة في مكان هادي.", gridIntro: "التفاصيل اللي بتخلي تطبيق الفلوس حاجة بتفتحها كل يوم.",
    grid: [
      { icon: "target", title: "أهداف الادخار", body: "حدد هدف، وحط فلوس ليه، وشوفه بيتملي." },
      { icon: "calendar", title: "الفواتير والأقساط", body: "المصاريف المتكررة ظاهرة قبل ما تفاجئك." },
      { icon: "wallet", title: "الاشتراكات والديون", body: "تابع اللي عليك واللي بيتجدد في قائمة واحدة." },
      { icon: "bell", title: "تذكيرات", body: "اعرف إيه اللي ميعاده قرب." },
      { icon: "mic", title: "إدخال صوتي", body: "قول المصروف وفلوسي يضيفه." },
      { icon: "languages", title: "عربي وإنجليزي", body: "تخطيط حقيقي من اليمين لليسار، مش مجرد ترجمة." },
      { icon: "moon", title: "فاتح وداكن", body: "الوضعين مصممين، مش معكوسين." },
      { icon: "chart", title: "تحليلات", body: "رسوم واضحة لفلوسك راحت فين." }
    ],
    howTitle: "شغّال في دقايق.", howIntro: "تلات خطوات، والتطبيق بيعمل الجزء المتكرر.",
    steps: [
      { title: "ضيف الأساسيات", body: "دخلك وفواتيرك الثابتة وأهدافك. ده كل اللي فلوسي محتاجه عشان يبدأ." },
      { title: "سيب الرسائل تيجي", body: "اسمح بالوصول للرسائل على أندرويد وتظهرلك معاملات البنك عشان تأكدها." },
      { title: "خطط وقرر", body: "خد خطة شهرية، واسأل Can I Spend?، ووازن لما الظروف تتغير." }
    ],
    privacyTitle: "بياناتك، وإنت المتحكم.", privacyIntro: "تطبيق الفلوس لازم يكسب الثقة. دي طريقة فلوسي في التعامل مع بياناتك.",
    privacy: [
      { title: "الإذن الأول", body: "فلوسي بيقرأ رسائل البنك بس بعد ما تسمح بالوصول للرسائل، وبيعرض كل اكتشاف عشان تأكده." },
      { title: "حسابك وبياناتك", body: "سجّل بالإيميل أو Google. خططك وأهدافك ومعاملاتك تبع حسابك." },
      { title: "امسح وقت ما تحب", body: "تقدر تمسح حسابك وبياناتك من التطبيق أو من الصفحات تحت." },
      { title: "ذكاء اصطناعي بحواجز أمان", body: "الخطط بتتراجع، والمساعد بيسأل قبل ما يغيّر أي حاجة." }
    ],
    privacyLinks: { policy: "سياسة الخصوصية", terms: "الشروط والأحكام", deleteAccount: "امسح حسابك", deleteData: "امسح بياناتك" },
    faqTitle: "أسئلة، وإجابات.",
    faq: [
      { q: "ألاقي فلوسي فين؟", a: "فلوسي متاح على أندرويد من خلال Google Play." },
      { q: "فلوسي بيقرأ كل رسايلي؟", a: "لأ. بيدور على رسائل معاملات البنوك بعد ما تسمح بالوصول للرسائل، وبيعرض كل معاملة مكتشفة عشان تأكدها. تقدر تقفل الإذن في أي وقت من إعدادات الموبايل." },
      { q: "الذكاء الاصطناعي هيغيّر ميزانيتي من غير ما يسأل؟", a: "لأ. المساعد بيقترح تغييرات، زي إنشاء هدف ادخار، ومفيش حاجة بتتطبق لحد ما تأكد." },
      { q: "موجود بالعربي؟", a: "أيوه. فلوسي متاح بالكامل بالعربي والإنجليزي، بتخطيط صح من اليمين لليسار." },
      { q: "أمسح حسابي إزاي؟", a: "افتح صفحة حذف الحساب اللي في الموقع، أو امسح حسابك من جوه التطبيق. وتقدر تطلب مسح بياناتك بس." }
    ],
    ctaTitle: "خلّي شهرك الجاي أكتر قابلية للتوقع.", ctaBody: "نزّل فلوسي، وخلّي أول رسالة من البنك تيجي، وشوف تصرف كام بأمان.",
    footer: { made: "من تطوير محمود ياسين في مصر.", contact: "تواصل", rights: "جميع الحقوق محفوظة." },
    theme: "تبديل الوضع", language: "EN"
  }
};
