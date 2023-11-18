// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGqkj7dODESBdeGemmpSPug8Ak498xsog",
    authDomain: "react-auth-d697d.firebaseapp.com",
    projectId: "react-auth-d697d",
    storageBucket: "react-auth-d697d.appspot.com",
    messagingSenderId: "213907008419",
    appId: "1:213907008419:web:152cb2d2d42036bd6a8816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);