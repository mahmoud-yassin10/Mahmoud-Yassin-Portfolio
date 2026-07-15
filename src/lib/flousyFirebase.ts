import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const config = {
  apiKey: import.meta.env.VITE_FLOUSY_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FLOUSY_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FLOUSY_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FLOUSY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FLOUSY_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FLOUSY_FIREBASE_APP_ID,
};

export const isFlousyFirebaseConfigured = Object.values(config).every(Boolean);

export const flousyFirebase = isFlousyFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(config)
  : null;

export const flousyAuth = flousyFirebase ? getAuth(flousyFirebase) : null;
export const flousyDb = flousyFirebase ? getFirestore(flousyFirebase) : null;
export const flousyFunctions = flousyFirebase ? getFunctions(flousyFirebase, "me-central1") : null;
