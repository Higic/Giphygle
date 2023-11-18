// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "[INSERT API KEY HERE]",
    authDomain: "[INSERT AUTH DOMAIN HERE]",
    projectId: "[INSERT PROJECT ID HERE]",
    storageBucket: "[INSERT STORAGE BUCKET HERE]",
    messagingSenderId: "[INSERT MESSAGING SENDER ID HERE]",
    appId: "[INSERT APP ID HERE]"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);