// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// REPLACE THESE WITH YOUR ACTUAL CREDENTIALS FROM FIREBASE CONSOLE
const firebaseConfig = {
    apiKey: "AIzaSyCJ6pbk2wAu6OKc28CM-4ng3XC-VS81sFU",
    authDomain: "yuvan-creations-website.firebaseapp.com",
    projectId: "yuvan-creations-website",
    storageBucket: "yuvan-creations-website.firebasestorage.app",
    messagingSenderId: "540062439412",
    appId: "1:540062439412:web:2050787dc0bb44aa684ba1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
