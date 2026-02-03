// src/services/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

function mustEnv(key: string) {
  const v = import.meta.env[key];
  if (!v) throw new Error(`[Firebase] Variável de ambiente ausente: ${key}`);
  return v as string;
}

const firebaseConfig = {
  apiKey: mustEnv("VITE_FIREBASE_API_KEY"),
  authDomain: mustEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: mustEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: mustEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: mustEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: mustEnv("VITE_FIREBASE_APP_ID"),
};

export const app =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function initAuthPersistence() {
  await setPersistence(auth, browserLocalPersistence);
}

export function initEmulators() {
  const use =
    import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === "true";
  if (!use) return;

  try {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  } catch {}
  try {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  } catch {}

  console.info("[Emulators] Connected (Firestore:8080, Auth:9099)");
}

export function logFirebaseProject() {
  console.info("[Firebase] projectId:", firebaseConfig.projectId);
}
// Fim src/services/firebase.ts