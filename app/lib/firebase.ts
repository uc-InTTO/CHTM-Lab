import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB_TNJTHGt3MOPcspqX0appd92LZZTnKms",
  authDomain: "lmo-system.firebaseapp.com",
  projectId: "lmo-system",
  storageBucket: "lmo-system.firebasestorage.app",
  messagingSenderId: "1000515646795",
  appId: "1:1000515646795:web:2b676bf9b7bc518a9be4ce",
  measurementId: "G-JRY9EK5V90",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
