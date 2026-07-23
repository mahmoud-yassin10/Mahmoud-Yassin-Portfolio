import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { HttpsError, onCall, type CallableRequest } from "firebase-functions/v2/https";

if (!getApps().length) initializeApp();

const db = getFirestore();
const auth = getAuth();

type CreateStudentData = {
  email?: unknown;
  name?: unknown;
  temporaryPassword?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function requireTeacher(request: CallableRequest<unknown>) {
  const uid = request.auth?.uid;
  if (!uid) throw new HttpsError("unauthenticated", "Sign in to manage the Student Hub.");
  const teacher = await db.doc(`hub_teachers/${uid}`).get();
  if (!teacher.exists || teacher.data()?.role !== "teacher") {
    throw new HttpsError("permission-denied", "Teacher access is required.");
  }
  return uid;
}

export const createHubStudent = onCall({ region: "me-central1", timeoutSeconds: 30 }, async (request) => {
  const teacherUid = await requireTeacher(request);
  const data = (request.data ?? {}) as CreateStudentData;
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const temporaryPassword = typeof data.temporaryPassword === "string" ? data.temporaryPassword : "";

  if (!isValidEmail(email) || email.length > 160) throw new HttpsError("invalid-argument", "A valid student email is required.");
  if (name.length < 1 || name.length > 100) throw new HttpsError("invalid-argument", "Student name must be 1 to 100 characters.");
  if (temporaryPassword.length < 8 || temporaryPassword.length > 128) throw new HttpsError("invalid-argument", "Temporary password must be 8 to 128 characters.");

  try {
    const student = await auth.createUser({ email, password: temporaryPassword, displayName: name });
    await auth.setCustomUserClaims(student.uid, { hubRole: "student" });
    await db.doc(`hub_students/${student.uid}`).set({ name, email, role: "student", createdBy: teacherUid, createdAt: FieldValue.serverTimestamp(), mustChangePassword: true });
    return { uid: student.uid };
  } catch (error) {
    console.error("Hub student creation failed", { teacherUid, email, error });
    throw new HttpsError("already-exists", "That student account could not be created. The email may already be in use.");
  }
});
