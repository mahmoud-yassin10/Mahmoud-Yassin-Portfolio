import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const config = {
  apiKey: import.meta.env.VITE_HUB_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_HUB_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_HUB_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_HUB_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_HUB_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_HUB_FIREBASE_APP_ID,
};

export const isHubFirebaseConfigured = Object.values(config).every(Boolean);

const hubApp: FirebaseApp | null = isHubFirebaseConfigured
  ? getApps().find((app) => app.name === "student-hub") ?? initializeApp(config, "student-hub")
  : null;

export const hubAuth = hubApp ? getAuth(hubApp) : null;
export const hubDb = hubApp ? getFirestore(hubApp) : null;
export const hubFunctions = hubApp ? getFunctions(hubApp, "me-central1") : null;
