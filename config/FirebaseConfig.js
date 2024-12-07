// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "chovieclamapplication-18b2a.firebaseapp.com",
  projectId: "chovieclamapplication-18b2a",
  storageBucket: "chovieclamapplication-18b2a.firebasestorage.app",
  messagingSenderId: "619980353574",
  appId: "1:619980353574:web:17008dd45842792816f6e7",
  measurementId: "G-8B97BJ6WW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);