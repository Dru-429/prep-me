import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdlRLc-5TASv-CIuT2BYCUSho9mlStBOY",
  authDomain: "prepme-80009.firebaseapp.com",
  projectId: "prepme-80009",
  storageBucket: "prepme-80009.firebasestorage.app",
  messagingSenderId: "692038416690",
  appId: "1:692038416690:web:2a88ac65a86fb1b36cff2b",
  measurementId: "G-E7WT08NZVP"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app)
export const db = getFirestore(app)