import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { flousyDb, flousyFunctions } from "./flousyFirebase";

export const FUNNEL_EVENTS = [
  "store_visit",
  "install",
  "sign_up_started",
  "sign_up_completed",
  "money_setup_started",
  "money_setup_completed",
  "first_transaction_added",
  "first_plan_generated",
  "sms_permission_viewed",
  "sms_permission_accepted",
  "referral_shared",
  "referral_activated",
  "day_1_return",
  "day_7_return",
] as const;

export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

export type AnalyticsEvent = {
  id: string;
  name: string;
  createdAt: Date;
  uid?: string;
  platform?: string;
  appVersion?: string;
  locale?: string;
  sessionId?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type FeedbackItem = {
  id: string;
  message: string;
  category?: string;
  kind?: string;
  createdAt: Date;
  uid?: string;
  hasPhotos?: boolean;
  hasAudio?: boolean;
  status?: "new" | "reviewing" | "resolved";
};

export type SmsFalseDetectionItem = {
  id: string;
  message: string;
  reportType: "not_an_expense" | "wrong_category" | "legacy";
  smsBody: string;
  smsSender: string;
  amount: number | null;
  isExpense: boolean;
  merchant: string;
  categoryId: string;
  correctedCategoryId: string;
  txnId: string;
  origin: string;
  createdAt: Date;
  uid?: string;
  status?: "new" | "reviewing" | "resolved";
};

export type StudentVerificationItem = {
  id: string;
  uid: string;
  status: "none" | "pending" | "verified" | "rejected";
  method?: "email" | "document" | null;
  email?: string;
  universityHint?: string;
  documentDownloadUrl?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
};

export type DashboardData = {
  events: AnalyticsEvent[];
  feedback: FeedbackItem[];
  studentVerifications: StudentVerificationItem[];
  smsFalseDetections: SmsFalseDetectionItem[];
  live: boolean;
};

export async function trackPublicFlousyEvent(name: "store_visit" | "install") {
  if (!flousyFunctions) return;
  try {
    await httpsCallable(flousyFunctions, "trackAnalyticsEvent")({
      name,
      platform: "web",
      appVersion: "portfolio",
      locale: navigator.language.slice(0, 12),
    });
  } catch {
    // Public telemetry is best-effort and must never block the landing page.
  }
}

const PORTFOLIO_SESSION_KEY = "flousy_portfolio_session";

function getPortfolioSessionId() {
  try {
    const existing = sessionStorage.getItem(PORTFOLIO_SESSION_KEY);
    if (existing) return existing;
    const sessionId = typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(PORTFOLIO_SESSION_KEY, sessionId);
    return sessionId;
  } catch {
    return undefined;
  }
}

export async function trackPortfolioVisit(pathname: string) {
  if (!flousyFunctions) return;
  try {
    await httpsCallable(flousyFunctions, "trackAnalyticsEvent")({
      name: "portfolio_visit",
      platform: "web",
      appVersion: "portfolio",
      locale: navigator.language.slice(0, 12),
      sessionId: getPortfolioSessionId(),
      metadata: { path: pathname.slice(0, 120) },
    });
  } catch {
    // Portfolio telemetry is best-effort and must never block navigation.
  }
}

const toDate = (value: unknown) => {
  if (value && typeof (value as { toDate?: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate();
  }
  if (value instanceof Date) return value;
  const date = new Date(String(value ?? ""));
  return Number.isNaN(date.valueOf()) ? new Date() : date;
};

const mapEvent = (id: string, data: DocumentData): AnalyticsEvent => ({
  id,
  name: String(data.name ?? "unknown"),
  createdAt: toDate(data.createdAt),
  uid: data.uid ? String(data.uid) : undefined,
  platform: data.platform ? String(data.platform) : undefined,
  appVersion: data.appVersion ? String(data.appVersion) : undefined,
  locale: data.locale ? String(data.locale) : undefined,
  sessionId: data.sessionId ? String(data.sessionId) : undefined,
  metadata: data.metadata ?? undefined,
});

const mapFeedback = (id: string, data: DocumentData): FeedbackItem => ({
  id,
  message: String(data.message ?? ""),
  category: data.category ? String(data.category) : undefined,
  kind: data.kind ? String(data.kind) : undefined,
  createdAt: toDate(data.createdAt),
  uid: data.uid ? String(data.uid) : undefined,
  hasPhotos: Boolean(data.hasPhotos),
  hasAudio: Boolean(data.hasAudio),
  status: data.status ?? "new",
});

const mapSmsFalseDetection = (id: string, data: DocumentData): SmsFalseDetectionItem => ({
  id,
  message: String(data.message ?? ""),
  // reportType/correctedCategoryId only exist on reports submitted after the
  // report-type schema shipped — older documents have neither field. Without
  // this branch they'd silently read as "not_an_expense", which is a guess
  // dressed up as data. "legacy" says plainly that we don't know which kind
  // this was.
  reportType:
    data.reportType === "wrong_category"
      ? "wrong_category"
      : data.reportType === "not_an_expense"
        ? "not_an_expense"
        : "legacy",
  smsBody: String(data.smsBody ?? ""),
  smsSender: String(data.smsSender ?? ""),
  amount: typeof data.amount === "number" ? data.amount : null,
  isExpense: Boolean(data.isExpense),
  merchant: String(data.merchant ?? ""),
  categoryId: String(data.categoryId ?? ""),
  correctedCategoryId: String(data.correctedCategoryId ?? ""),
  txnId: String(data.txnId ?? ""),
  origin: String(data.origin ?? ""),
  createdAt: toDate(data.createdAt),
  uid: data.uid ? String(data.uid) : undefined,
  status: data.status ?? "new",
});

const mapStudentVerification = (id: string, data: DocumentData): StudentVerificationItem => ({
  id,
  uid: String(data.uid ?? id),
  status: (data.status ?? "none") as StudentVerificationItem["status"],
  method: (data.method ?? null) as StudentVerificationItem["method"],
  email: data.email ? String(data.email) : undefined,
  universityHint: data.universityHint ? String(data.universityHint) : undefined,
  documentDownloadUrl: data.documentDownloadUrl ? String(data.documentDownloadUrl) : undefined,
  rejectionReason: data.rejectionReason ? String(data.rejectionReason) : undefined,
  createdAt: toDate(data.createdAt),
  updatedAt: data.updatedAt ? toDate(data.updatedAt) : undefined,
  reviewedAt: data.reviewedAt ? toDate(data.reviewedAt) : undefined,
  reviewedBy: data.reviewedBy ? String(data.reviewedBy) : undefined,
});

export async function loadLiveDashboardData(days = 30): Promise<DashboardData> {
  if (!flousyDb) throw new Error("Firebase is not configured.");
  const since = new Date(Date.now() - days * 86400000);
  const eventCollection = collection(flousyDb, "analytics_events");
  const eventQuery = query(eventCollection, where("createdAt", ">=", since), orderBy("createdAt", "desc"), limit(5000));
  const eventSnapshot = await getDocs(eventQuery);
  const feedbackSnapshot = await getDocs(query(collection(flousyDb, "feedback_inbox"), orderBy("createdAt", "desc"), limit(100)));
  const allFeedback = feedbackSnapshot.docs.map((docSnap) => mapFeedback(docSnap.id, docSnap.data()));
  const feedback = allFeedback.filter((item) => item.kind !== "sms_false_detection");
  let smsFalseDetections: SmsFalseDetectionItem[] = [];
  try {
    const smsSnapshot = await getDocs(
      query(collection(flousyDb, "sms_false_detection_inbox"), orderBy("createdAt", "desc"), limit(100)),
    );
    smsFalseDetections = smsSnapshot.docs.map((docSnap) => mapSmsFalseDetection(docSnap.id, docSnap.data()));
  } catch {
    smsFalseDetections = allFeedback
      .filter((item) => item.kind === "sms_false_detection")
      .map((item) => mapSmsFalseDetection(item.id, {
        message: item.message,
        createdAt: item.createdAt,
        uid: item.uid,
        status: item.status,
      }));
  }
  let studentVerifications: StudentVerificationItem[] = [];
  try {
    const studentSnapshot = await getDocs(
      query(collection(flousyDb, "student_verification_inbox"), orderBy("updatedAt", "desc"), limit(100)),
    );
    studentVerifications = studentSnapshot.docs.map((docSnap) => mapStudentVerification(docSnap.id, docSnap.data()));
  } catch {
    try {
      const studentSnapshot = await getDocs(
        query(collection(flousyDb, "student_verification_inbox"), orderBy("createdAt", "desc"), limit(100)),
      );
      studentVerifications = studentSnapshot.docs.map((docSnap) => mapStudentVerification(docSnap.id, docSnap.data()));
    } catch {
      studentVerifications = [];
    }
  }
  return {
    live: true,
    events: eventSnapshot.docs.map((docSnap) => mapEvent(docSnap.id, docSnap.data())),
    feedback,
    studentVerifications,
    smsFalseDetections,
  };
}

export async function reviewStudentVerification(options: {
  inboxId: string;
  uid: string;
  status: "verified" | "rejected";
  rejectionReason?: string;
  reviewerUid: string;
}) {
  if (!flousyDb) throw new Error("Firebase is not configured.");
  const { inboxId, uid, status, rejectionReason, reviewerUid } = options;
  const patch = {
    status,
    rejectionReason: status === "rejected" ? (rejectionReason ?? "").slice(0, 500) : null,
    reviewedAt: serverTimestamp(),
    reviewedBy: reviewerUid,
    updatedAt: serverTimestamp(),
  };
  const batch = writeBatch(flousyDb);
  batch.update(doc(flousyDb, "student_verification_inbox", inboxId), patch);
  batch.update(doc(flousyDb, "users", uid, "student_verification", "current"), patch);
  await batch.commit();
}

export async function reviewSmsFalseDetection(options: {
  inboxId: string;
  status: "new" | "reviewing" | "resolved";
}) {
  if (!flousyDb) throw new Error("Firebase is not configured.");
  const patch = { status: options.status };
  await updateDoc(doc(flousyDb, "sms_false_detection_inbox", options.inboxId), patch);
  try {
    await updateDoc(doc(flousyDb, "feedback_inbox", options.inboxId), patch);
  } catch {
    // Feedback copy is optional; dedicated inbox is the source of truth.
  }
}

export async function isFlousyAdmin(uid: string) {
  if (!flousyDb) return false;
  const configuredOwnerUid = String(import.meta.env.VITE_FLOUSY_OWNER_UID ?? "").trim();
  if (configuredOwnerUid && configuredOwnerUid !== uid) return false;
  const ownerSnapshot = await getDoc(doc(flousyDb, "admin_users", uid));
  return ownerSnapshot.exists() && ownerSnapshot.data().role === "owner";
}
