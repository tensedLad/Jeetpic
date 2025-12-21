
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDKdeYTZC4krvibA7TRF91G1XzvpKSrYQU",
    authDomain: "jeetpic.firebaseapp.com",
    databaseURL: "https://jeetpic-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jeetpic",
    storageBucket: "jeetpic.firebasestorage.app",
    messagingSenderId: "265877042150",
    appId: "1:265877042150:web:4f3cbc3340472a7ad45c27",
    measurementId: "G-591N4EXG2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
