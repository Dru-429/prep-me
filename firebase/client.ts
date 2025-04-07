// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);