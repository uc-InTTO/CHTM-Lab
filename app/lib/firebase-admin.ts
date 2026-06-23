import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let cachedDb: ReturnType<typeof getFirestore> | null = null;

function createAdminCredentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return cert({
    projectId,
    clientEmail,
    privateKey,
  });
}

export function getAdminFirestore() {
  if (cachedDb) {
    return cachedDb;
  }

  const credentials = createAdminCredentials();

  if (!credentials) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY for server-side imports.",
    );
  }

  const app = getApps().length ? getApps()[0] : initializeApp({ credential: credentials });

  cachedDb = getFirestore(app);
  return cachedDb;
}