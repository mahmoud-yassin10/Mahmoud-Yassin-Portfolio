/**
 * Flousy case study, laid out like the SquashVAR page.
 * Source: the Five-Project Evidence Dossier and the app's own demo. Figures from usage are REPORTED, not audited.
 */
export const FLOUSY_SITE_URL = "https://flousy.mahmoud-yassin.com";

type Stage = { label: string; short: string; title: string; body: string; input: string; output: string };

type FlousyCopy = {
  back: string; category: string; lead: string; status: string; play: string; site: string;
  roleLabel: string; role: string; toolsLabel: string; period: string; periodLabel: string;
  nav: string[]; navLabel: string;
  overviewTitle: string; overviewBody: string; contributionTitle: string; contribution: string;
  contextTitle: string; usage: Array<[string, string]>; context: string;
  previewTitle: string; previewIntro: string; captions: [string, string]; altActivity: string; altAi: string;
  systemTitle: string; systemIntro: string; stageNav: string; input: string; output: string; stages: Stage[];
  turnTitle: string; turnBody: string; turnHeading: string;
  resultsTitle: string; resultsIntro: string;
  useTitle: string; useSubtitle: string; measure: string; value: string; useRows: Array<[string, string]>; useNote: string;
  checksTitle: string; checksSubtitle: string; checkRows: Array<[string, string]>; checksNote: string;
  boundaryTitle: string; boundaryBody: string;
  limitationsTitle: string; limitations: Array<{ title: string; body: string }>;
  linksTitle: string; linksBody: string; playMeta: string; siteMeta: string;
};

export const flousyCopy: { en: FlousyCopy; ar: FlousyCopy } = {
  en: {
    back: "Back to projects", category: "Mobile app / AI",
    lead: "A budgeting app built around the question people actually ask: can I afford this?",
    status: "Android release on Google Play (reported)", play: "Get Flousy on Google Play", site: "Visit Flousy",
    roleLabel: "My role", role: "Founder and independent developer", toolsLabel: "Built with", period: "Jan 2025 to present", periodLabel: "Period",
    nav: ["Overview", "In the app", "System", "Results", "Limitations", "Links"], navLabel: "Case study sections",
    overviewTitle: "From recording money to advising on it.",
    overviewBody: "Logging every expense by hand is a chore, obligations are scattered, and a chart of past spending does not say whether a purchase fits this month. Flousy imports bank messages, builds a plan, and answers the question before you spend.",
    contributionTitle: "What I contributed",
    contribution: "I conceived, designed and built Flousy alone: the Flutter app, the Firebase backend, the SMS import and the AI planner. Outside users gave feedback, and there are no co-developers.",
    contextTitle: "Reported use",
    usage: [["Transactions tracked", "306 (EGP 259,520)"], ["Users", "About 100"], ["Allocated to goals", "EGP 50K+"]],
    context: "September to October 2026. These are my own reports of the app's data, not an independent audit.",
    previewTitle: "In the app.", previewIntro: "Two real screens from the Android app: the Activity list with transactions imported from bank SMS, and the Flousy AI assistant.",
    captions: ["Activity, with transactions imported from SMS", "Flousy AI, answering from the user's own data"],
    altActivity: "Flousy Activity screen showing income, expenses and imported transactions", altAi: "Flousy AI chat screen with suggested questions",
    systemTitle: "How Flousy works.", systemIntro: "Five stages take a bank message to a decision. Select a stage to see what goes in and what comes out.",
    stageNav: "Flousy stages", input: "Input", output: "Output",
    stages: [
      { label: "Import from SMS", short: "SMS", title: "Import from bank SMS", body: "On Android, Flousy reads Egyptian bank messages, matches them to accounts and asks for confirmation. Duplicates are suppressed, wrong detections can be reported, and a background job retries after the app is closed.", input: "A bank SMS message", output: "A confirmed transaction" },
      { label: "Plan with AI", short: "Plan", title: "Plan with AI, with guardrails", body: "Cloud Functions ask Gemini for a monthly budget as structured output, using bills, installments, subscriptions, debt, savings and goals. The result is validated and retried, with a 50/30/20 fallback. Zero income does not get an invented plan.", input: "Income, bills, debts, goals", output: "A validated monthly budget" },
      { label: "Decide", short: "Decide", title: "Answer the real question", body: "Safe to Spend shows what is left after commitments. Can I Spend? checks a specific purchase against the budget and the rest of the month. Both came from what users said they needed.", input: "The plan and spending so far", output: "Safe to Spend and Can I Spend? answers" },
      { label: "Ask the AI", short: "Ask", title: "Ask Flousy AI", body: "The assistant answers questions from the user's real data. When it proposes a change, such as creating a goal, nothing is applied until the user confirms.", input: "A question in plain language", output: "An answer, or a change to confirm" },
      { label: "Two languages", short: "AR/EN", title: "Arabic and English", body: "The interface is Arabic and English with right-to-left layout, voice capture, reminders, and Firebase sign-in with per-user data.", input: "The user's language and account", output: "A localized, per-user app" }
    ],
    turnHeading: "Where I changed my mind", turnTitle: "A budget bug that taught me to ask the user",
    turnBody: "On August 9, 2026 I documented a bug: when the planner re-adjusted a budget and gave a category zero, the category could be dropped for good without the user choosing that. My write-up argues the app should act on what the user explicitly says, not infer an exclusion from a zero.",
    resultsTitle: "What it has done.", resultsIntro: "Usage figures are reported by me. The engineering checks come from a July 2026 baseline.",
    useTitle: "Reported use", useSubtitle: "September to October 2026", measure: "Measure", value: "Value",
    useRows: [["Transactions tracked", "306"], ["Value of transactions", "EGP 259,520"], ["Users", "About 100"], ["Goal allocations", "EGP 50K+"]],
    useNote: "Goal allocations are amounts users budgeted toward goals, not verified transfers.",
    checksTitle: "Engineering checks", checksSubtitle: "July 2026 baseline", checkRows: [["Backend tests", "40 of 40 passing"], ["Flutter tests", "137 of 137 passing"]],
    checksNote: "Test counts show the suites passed at that point, not product quality or adoption.",
    boundaryTitle: "Reported, not audited", boundaryBody: "User and transaction counts come from my own reports of the app. I do not have verified installs, retention or revenue figures.",
    limitationsTitle: "What it does not do yet.",
    limitations: [
      { title: "No verified product metrics", body: "I do not have verified installs, retention or revenue figures yet." },
      { title: "Self-reported numbers", body: "User and transaction counts come from my own reports of the app's data, not an independent audit." },
      { title: "SMS import is Android only", body: "Reading bank messages works on Android. iOS and web are not released." }
    ],
    linksTitle: "Try it. See where it lives.", linksBody: "Flousy is an Android app. The landing page explains it, and Google Play has the release.",
    playMeta: "Android · Google Play", siteMeta: "Landing page"
  },
  ar: {
    back: "ارجع للمشاريع", category: "تطبيق موبايل / ذكاء اصطناعي",
    lead: "تطبيق ميزانية مبني على السؤال اللي الناس بتسأله فعلاً: أقدر أشتري ده؟",
    status: "إصدار أندرويد على Google Play (حسب تقاريري)", play: "حمّل فلوسي من Google Play", site: "زور فلوسي",
    roleLabel: "دوري", role: "مؤسس ومطوّر مستقل", toolsLabel: "الأدوات", period: "من يناير ٢٠٢٥ لحد دلوقتي", periodLabel: "الفترة",
    nav: ["الفكرة", "جوّه التطبيق", "النظام", "النتائج", "الحدود", "الروابط"], navLabel: "أقسام دراسة المشروع",
    overviewTitle: "من تسجيل الفلوس لنصيحة فيها.",
    overviewBody: "تسجيل كل مصروف بإيدك تعب، والالتزامات مبعثرة، ورسم للمصاريف اللي فاتت مش بيقول إذا كان الشراء مناسب للشهر ده. فلوسي بيستورد رسائل البنك وبيبني خطة وبيجاوب قبل ما تصرف.",
    contributionTitle: "مساهمتي",
    contribution: "فكرت في فلوسي وصممته وبنيته لوحدي: تطبيق Flutter وباك إند Firebase واستيراد الرسائل ومخطط الذكاء الاصطناعي. مستخدمين من بره دوا ملاحظاتهم، ومفيش مطوّرين معايا.",
    contextTitle: "الاستخدام حسب تقاريري",
    usage: [["معاملات مسجلة", "٣٠٦ (٢٥٩٬٥٢٠ جنيه)"], ["المستخدمين", "حوالي ١٠٠"], ["مخصص للأهداف", "+٥٠ ألف جنيه"]],
    context: "من سبتمبر لأكتوبر ٢٠٢٦. دي تقاريري أنا عن بيانات التطبيق، مش مراجعة مستقلة.",
    previewTitle: "جوّه التطبيق.", previewIntro: "شاشتين حقيقيتين من تطبيق أندرويد: قائمة النشاط بمعاملات مستوردة من رسائل البنك، ومساعد فلوسي بالذكاء الاصطناعي.",
    captions: ["النشاط، بمعاملات مستوردة من الرسائل", "Flousy AI بيجاوب من بيانات المستخدم نفسه"],
    altActivity: "شاشة النشاط في فلوسي بتعرض الدخل والمصاريف والمعاملات المستوردة", altAi: "شاشة مساعد فلوسي بأسئلة مقترحة",
    systemTitle: "فلوسي بيشتغل إزاي.", systemIntro: "خمس مراحل بتوصّل رسالة البنك لقرار. اختار مرحلة وشوف إيه الداخل وإيه الخارج.",
    stageNav: "مراحل فلوسي", input: "المدخل", output: "المخرج",
    stages: [
      { label: "استيراد من الرسائل", short: "رسائل", title: "استيراد من رسائل البنك", body: "على أندرويد، فلوسي بيقرأ رسائل البنوك المصرية وبيربطها بالحسابات وبيطلب تأكيدك. بيمنع التكرار، وتقدر تبلّغ عن أي اكتشاف غلط، وفي مهمة خلفية بتحاول تاني بعد ما التطبيق يتقفل.", input: "رسالة من البنك", output: "معاملة مؤكدة" },
      { label: "تخطيط بالذكاء الاصطناعي", short: "خطة", title: "خطة بالذكاء الاصطناعي، بحواجز أمان", body: "Cloud Functions بتطلب من Gemini ميزانية شهرية كمخرجات منظمة باستخدام الفواتير والأقساط والاشتراكات والديون والمدخرات والأهداف. النتيجة بتتراجع وبتتعاد، مع بديل ٥٠/٣٠/٢٠. لو الدخل صفر مفيش خطة مخترعة.", input: "الدخل والفواتير والديون والأهداف", output: "ميزانية شهرية متحقق منها" },
      { label: "قرار", short: "قرار", title: "جاوب السؤال الحقيقي", body: "Safe to Spend بيوريك الباقي بعد الالتزامات. Can I Spend? بيقارن مشترى معيّن بالميزانية وباقي الشهر. الاتنين جم من اللي المستخدمين قالوا إنهم محتاجينه.", input: "الخطة والمصروف لحد دلوقتي", output: "إجابات Safe to Spend وCan I Spend?" },
      { label: "اسأل الذكاء الاصطناعي", short: "اسأل", title: "اسأل Flousy AI", body: "المساعد بيجاوب من بيانات المستخدم الحقيقية. لما يقترح تغيير، زي إنشاء هدف، مفيش حاجة بتتطبق لحد ما المستخدم يأكد.", input: "سؤال بلغة عادية", output: "إجابة، أو تغيير للتأكيد" },
      { label: "لغتين", short: "عربي/EN", title: "عربي وإنجليزي", body: "الواجهة عربي وإنجليزي بتخطيط من اليمين لليسار، وإدخال صوتي وتذكيرات وتسجيل دخول Firebase وبيانات لكل مستخدم.", input: "لغة المستخدم وحسابه", output: "تطبيق مترجم وخاص بكل مستخدم" }
    ],
    turnHeading: "لما غيّرت رأيي", turnTitle: "خطأ في الميزانية علّمني أسأل المستخدم",
    turnBody: "في ٩ أغسطس ٢٠٢٦ وثّقت خطأ: لما المخطط بيعيد ضبط ميزانية وبيدّي فئة صفر، الفئة ممكن تتشال نهائياً من غير ما المستخدم يختار كده. كتابتي بتقول إن التطبيق لازم يتصرف على اللي المستخدم يقوله صراحة، مش يستنتج استبعاد من صفر.",
    resultsTitle: "اللي عمله لحد دلوقتي.", resultsIntro: "أرقام الاستخدام من تقاريري. فحوصات الهندسة من قياس يوليو ٢٠٢٦.",
    useTitle: "الاستخدام حسب تقاريري", useSubtitle: "سبتمبر لأكتوبر ٢٠٢٦", measure: "المقياس", value: "القيمة",
    useRows: [["معاملات مسجلة", "٣٠٦"], ["قيمة المعاملات", "٢٥٩٬٥٢٠ جنيه"], ["المستخدمين", "حوالي ١٠٠"], ["تخصيص الأهداف", "+٥٠ ألف جنيه"]],
    useNote: "تخصيص الأهداف هو مبالغ المستخدمين خصصوها لأهدافهم، مش تحويلات متحقق منها.",
    checksTitle: "فحوصات الهندسة", checksSubtitle: "قياس يوليو ٢٠٢٦", checkRows: [["اختبارات الباك إند", "٤٠ من ٤٠ ناجحة"], ["اختبارات Flutter", "١٣٧ من ١٣٧ ناجحة"]],
    checksNote: "أعداد الاختبارات بتوضح إن الاختبارات نجحت وقتها، مش جودة المنتج أو انتشاره.",
    boundaryTitle: "حسب تقاريري، مش مراجَع", boundaryBody: "أعداد المستخدمين والمعاملات من تقاريري أنا عن التطبيق. معنديش أرقام تثبيت أو احتفاظ أو إيراد متحقق منها.",
    limitationsTitle: "اللي لسه مبيعملوش.",
    limitations: [
      { title: "مفيش أرقام منتج متحقق منها", body: "معنديش لسه أرقام تثبيت أو احتفاظ أو إيراد متحقق منها." },
      { title: "أرقام من تقاريري", body: "أعداد المستخدمين والمعاملات من تقاريري عن بيانات التطبيق، مش مراجعة مستقلة." },
      { title: "الاستيراد من الرسائل أندرويد بس", body: "قراءة رسائل البنك بتشتغل على أندرويد. iOS والويب لسه مش منشورين." }
    ],
    linksTitle: "جرّبه. وشوف مكانه.", linksBody: "فلوسي تطبيق أندرويد. الصفحة التعريفية بتشرحه، وGoogle Play فيه الإصدار.",
    playMeta: "أندرويد · Google Play", siteMeta: "الصفحة التعريفية"
  }
};
