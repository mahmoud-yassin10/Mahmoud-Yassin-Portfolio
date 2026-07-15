import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
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
  createdAt: Date;
  uid?: string;
  hasPhotos?: boolean;
  hasAudio?: boolean;
  status?: "new" | "reviewing" | "resolved";
};

export type DashboardData = {
  events: AnalyticsEvent[];
  feedback: FeedbackItem[];
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

export async function loadLiveDashboardData(days = 30): Promise<DashboardData> {
  if (!flousyDb) throw new Error("Firebase is not configured.");
  const since = new Date(Date.now() - days * 86400000);
  const eventCollection = collection(flousyDb, "analytics_events");
  const eventQuery = query(eventCollection, where("createdAt", ">=", since), orderBy("createdAt", "desc"), limit(5000));
  const eventSnapshot = await getDocs(eventQuery);
  const feedbackSnapshot = await getDocs(query(collection(flousyDb, "feedback_inbox"), orderBy("createdAt", "desc"), limit(100)));
  return {
    live: true,
    events: eventSnapshot.docs.map((doc) => mapEvent(doc.id, doc.data())),
    feedback: feedbackSnapshot.docs.map((doc) => ({
      id: doc.id,
      message: String(doc.data().message ?? ""),
      category: doc.data().category ? String(doc.data().category) : undefined,
      createdAt: toDate(doc.data().createdAt),
      uid: doc.data().uid ? String(doc.data().uid) : undefined,
      hasPhotos: Boolean(doc.data().hasPhotos),
      hasAudio: Boolean(doc.data().hasAudio),
      status: doc.data().status ?? "new",
    })),
  };
}

export async function isFlousyAdmin(uid: string) {
  if (!flousyDb) return false;
  return (await getDoc(doc(flousyDb, "admin_users", uid))).exists();
}
