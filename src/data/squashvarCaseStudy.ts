/** Display copy and measured results for the SquashVAR research case study.
 * Detector/event metrics match Tables 2 and 3 of the submitted manuscript;
 * per-surface results match the existing evidence-backed case study.
 * Detection, impact detection and line-call accuracy are separate evaluations.
 */
export const squashDetectorResults = [
  { input: "1920 px", precision: "0.937", map50: "0.906" },
  { input: "1280 px", precision: "0.862", map50: "0.911" }
];
export const squashImpactResults = [
  { en: "Timing only", ar: "تطابق التوقيت", f1: "0.729" },
  { en: "Timing + court surface", ar: "التوقيت وسطح الملعب", f1: "0.636" }
];
export const squashSurfaceResults = [
  { en: "Front wall", ar: "الحائط الأمامي", f1: "0.847" },
  { en: "Floor", ar: "الأرضية", f1: "0.571" },
  { en: "Left wall", ar: "الحائط الأيسر", f1: "0.267" },
  { en: "Right wall", ar: "الحائط الأيمن", f1: "0.000" }
];

export const squashCaseCopy = {
  en: {
    back: "Back to projects", category: "Computer vision research", status: "Submitted, awaiting review",
    lead: "An assistant referee for squash, built around one camera and a calibrated court.",
    paper: "Read manuscript", code: "View source", imageAlt: "SquashVAR prototype output showing court-plane calibration and a tracked ball trajectory",
    imageCaption: "Example output from the research prototype. Line-call accuracy has not been measured.",
    roleLabel: "My role", role: "Independent developer & researcher", toolsLabel: "Built with",
    nav: ["Overview", "Demo", "System", "Evaluation", "Limitations", "Manuscript"], navLabel: "Case study sections",
    overviewTitle: "A second look at a fast-moving game.",
    overviewBody: "A tiny ball, fast rallies, occluded views and glass reflections make squash difficult to analyze. I explored whether one ordinary camera could provide court-referenced evidence for a referee to review.",
    contributionTitle: "What I contributed", contextTitle: "Research context", training: "Training set", benchmark: "Evaluation benchmark",
    trainingValue: "3,001 images · 6,277 labelled balls", benchmarkValue: "3,000 frames · 78 reference impacts",
    context: "Mentored by Rijul Gupta through Lumiere. Exploratory discussions with the Egyptian Squash Federation have not led to adoption.",
    systemTitle: "From video to a court-referenced event.", systemIntro: "Explore the five stages of the pipeline. Each stage passes a specific output to the next.",
    stages: ["Detect", "Track", "Map", "Impact", "Decide"], shortStages: ["Detect", "Track", "Map", "Impact", "Decide"], stageNav: "System pipeline stages",
    input: "Input", output: "Output",
    stageInputs: ["Match video", "Frame-by-frame detections", "Pixel coordinates", "Mapped trajectory", "Mapped impact"],
    stageOutputs: ["Ball detections", "A linked ball trajectory", "Court coordinates (cm)", "Candidate impacts", "IN / OUT / NO_DECISION"],
    abstentionTitle: "Knowing when to abstain", abstentionBody: "Within 2 cm of a court line, the system returns NO_DECISION. That band is a design choice; calibration uncertainty has not yet been quantified.",
    evaluationTitle: "What the evaluation actually measures.", evaluationIntro: "Ball detection and impact-event detection were evaluated separately. Neither score establishes the accuracy of an IN or OUT call.",
    detectionTitle: "Ball detection", detectionSubtitle: "YOLOv8-S, two input settings", resolution: "Input size", precision: "Precision", map: "mAP@50",
    detectionCaption: "Precision is highest at 1920 px; mAP@50 is highest at 1280 px. These are different operating settings.",
    impactTitle: "Impact detection", impactSubtitle: "3,000 frames · 78 labelled impacts", matching: "Matching rule", f1: "F1 score",
    impactCaption: "Reported with a ±25-frame matching window. Surface-aware matching also requires the correct court surface.",
    surfaceSummary: "Explore results by court surface", surface: "Court surface", surfaceCaption: "The benchmark contains only 11 left-wall and 5 right-wall impacts, so side-wall results have limited support.",
    boundaryTitle: "Line-call accuracy is still unknown.", boundaryBody: "The reported results measure finding the ball and detecting impacts. They do not validate the correctness of the final IN / OUT decision.",
    limitationsTitle: "The limits are part of the result.",
    limitations: [
      { title: "Unvalidated line calls", body: "IN / OUT accuracy has not been measured. This remains a research prototype rather than a production officiating system." },
      { title: "Weak side-wall performance", body: "Side-wall impact detection is unreliable, with few reference events in the current benchmark." },
      { title: "Calibration needs stronger evidence", body: "The abstention band is not backed by a measured calibration-uncertainty estimate. Independent footage is also needed." }
    ],
    reviewNote: "Reviewers requested quantitative line-call accuracy, independent footage and stronger calibration evidence. The revised manuscript is submitted and awaiting review.",
    resourcesTitle: "Read the research. Inspect the work.", resourcesBody: "The manuscript is a submission, not an accepted journal publication. The source and research figures are available for closer inspection.",
    figures: "Browse research figures", figuresMeta: "Figures and evaluation artifacts", paperMeta: "Submitted manuscript · PDF · 9.5 MB", codeMeta: "Public repository · Implementation & evaluation"
  },
  ar: {
    back: "ارجع للمشاريع", category: "بحث في الرؤية الحاسوبية", status: "مقدّم وفي انتظار المراجعة",
    lead: "مساعد حكم للاسكواش، بكاميرا واحدة ومعايرة هندسية للملعب.",
    paper: "اقرأ البحث", code: "شوف الكود", imageAlt: "ناتج فعلي من نموذج SquashVAR بيعرض معايرة مستويات الملعب ومسار الكرة",
    imageCaption: "مثال من النموذج البحثي. دقة قرارات الخطوط لسه متقاستش.",
    roleLabel: "دوري", role: "مطوّر وباحث مستقل", toolsLabel: "الأدوات",
    nav: ["الفكرة", "العرض", "النظام", "التقييم", "الحدود", "الورقة"], navLabel: "أقسام دراسة المشروع",
    overviewTitle: "نظرة تانية على لعبة سريعة.",
    overviewBody: "كرة صغيرة، وتبادلات سريعة، ولاعبون بيحجبوا الرؤية، وانعكاسات الزجاج. جرّبت هل كاميرا عادية واحدة تقدر تقدّم للحكم دليل مرتبط بهندسة الملعب يقدر يراجعه.",
    contributionTitle: "مساهمتي", contextTitle: "سياق البحث", training: "بيانات التدريب", benchmark: "اختبار التقييم",
    trainingValue: "٣٬٠٠١ صورة و٦٬٢٧٧ كرة معلّمة", benchmarkValue: "٣٬٠٠٠ إطار و٧٨ ارتطام مرجعي",
    context: "بإشراف Rijul Gupta من خلال Lumiere. المحادثات الاستكشافية مع الاتحاد المصري للاسكواش لم تؤدِّ لتبنّي النظام.",
    systemTitle: "من الفيديو لحدث مرتبط بالملعب.", systemIntro: "استكشف المراحل الخمسة. ناتج كل مرحلة بيبقى مدخل للمرحلة اللي بعدها.",
    stages: ["الكشف", "التتبع", "المعايرة", "الارتطامات", "القرار"], shortStages: ["كشف", "تتبع", "معايرة", "ارتطام", "قرار"], stageNav: "مراحل معالجة الفيديو",
    input: "المدخل", output: "الناتج",
    stageInputs: ["فيديو المباراة", "الكشوف في كل إطار", "إحداثيات بالبكسل", "المسار بعد المعايرة", "ارتطام مرتبط بالملعب"],
    stageOutputs: ["مواضع الكرة", "مسار متصل للكرة", "إحداثيات الملعب بالسنتيمتر", "ارتطامات محتملة", "IN / OUT / NO_DECISION"],
    abstentionTitle: "إمتى النظام يمتنع عن القرار؟", abstentionBody: "جوه نطاق ٢ سم من خط الملعب، النظام بيرجع NO_DECISION. النطاق اختيار تصميمي، ولسه عدم يقين المعايرة متقاسش.",
    evaluationTitle: "إيه اللي التقييم بيقيسه فعلًا؟", evaluationIntro: "كشف الكرة وكشف الارتطامات اتقيّموا بشكل منفصل. ولا نتيجة منهم بتثبت دقة قرار IN أو OUT.",
    detectionTitle: "كشف الكرة", detectionSubtitle: "YOLOv8-S بإعدادين لحجم الصورة", resolution: "حجم المدخل", precision: "Precision", map: "mAP@50",
    detectionCaption: "أعلى Precision عند 1920px، وأعلى mAP@50 عند 1280px. دي إعدادات تشغيل مختلفة.",
    impactTitle: "كشف الارتطامات", impactSubtitle: "٣٬٠٠٠ إطار و٧٨ ارتطام معلّم", matching: "قاعدة المطابقة", f1: "نتيجة F1",
    impactCaption: "النتائج بنافذة مطابقة ±٢٥ إطار. مطابقة السطح بتشترط كمان تحديد السطح الصحيح من الملعب.",
    surfaceSummary: "شوف النتائج حسب سطح الملعب", surface: "سطح الملعب", surfaceCaption: "الاختبار فيه ١١ ارتطام أيسر و٥ أيمن بس، فالأدلة على أداء الجوانب محدودة.",
    boundaryTitle: "دقة قرارات الخطوط لسه غير معروفة.", boundaryBody: "النتائج بتقيس العثور على الكرة وكشف الارتطامات. مش بتتحقق من صحة القرار النهائي IN أو OUT.",
    limitationsTitle: "حدود النظام جزء من النتيجة.",
    limitations: [
      { title: "قرارات الخطوط لسه متقيّمتش", body: "دقة IN وOUT لسه متقاستش. ده نموذج بحثي، مش نظام تحكيم جاهز للاستخدام الإنتاجي." },
      { title: "أداء الجوانب ضعيف", body: "كشف ارتطامات الحوائط الجانبية غير موثوق، وعدد الأحداث المرجعية في الاختبار الحالي قليل." },
      { title: "المعايرة محتاجة أدلة أقوى", body: "نطاق الامتناع مش مدعوم بقياس لعدم يقين المعايرة، وفيه احتياج للقطات مستقلة كمان." }
    ],
    reviewNote: "المراجعون طلبوا قياس دقة قرارات الخطوط ولقطات مستقلة وأدلة معايرة أقوى. النسخة المنقحة مقدّمة وفي انتظار المراجعة.",
    resourcesTitle: "اقرأ البحث وراجع التنفيذ.", resourcesBody: "الورقة مقدّمة للمراجعة، ولسه مش منشورة في مجلة. الكود والأشكال البحثية متاحين للمراجعة بتفصيل أكبر.",
    figures: "شوف الأشكال البحثية", figuresMeta: "أشكال البحث وملفات التقييم", paperMeta: "نسخة مقدّمة للمراجعة · PDF · ٩٫٥ ميجابايت", codeMeta: "مستودع عام · التنفيذ والتقييم"
  }
};
