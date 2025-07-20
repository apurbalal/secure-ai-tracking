// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAPzVGJtWRmw6sl6deY-z0KXNsflOv941E",
  authDomain: "quick-ai-chat.firebaseapp.com",
  projectId: "quick-ai-chat",
  storageBucket: "quick-ai-chat.firebasestorage.app",
  messagingSenderId: "371295083282",
  appId: "1:371295083282:web:f30c69d0a6d0f2a1a0b1cb",
  measurementId: "G-GEZMVMBPWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, "us-central1");

// const analytics = getAnalytics(app);
