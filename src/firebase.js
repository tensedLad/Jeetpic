
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Initialize Firebase with environment variables
// For security, API keys should be in environment variables, not hardcoded
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDKdeYTZC4krvibA7TRF91G1XzvpKSrYQU",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jeetpic.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://jeetpic-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jeetpic",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jeetpic.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "265877042150",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:265877042150:web:4f3cbc3340472a7ad45c27",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-591N4EXG2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
