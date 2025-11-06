import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      throw new Error(
        "Missing Firebase Admin environment variables. Please check your .env.local file."
      );
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

let firebaseAdmin: { auth: Auth; db: Firestore } | null = null;

if (
  typeof window === "undefined" &&
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
) {
  try {
    firebaseAdmin = initFirebaseAdmin();
  } catch (error) {
    console.warn("Firebase Admin initialization failed:", error);
    firebaseAdmin = null;
  }
}

export const { auth, db } = firebaseAdmin || {
  auth: null as Auth | null,
  db: null as Firestore | null,
};
