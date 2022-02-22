// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrZRGbaUu2CwkXTxxln7YsaYH3cQcX2sg",
  authDomain: "minehouse-app.firebaseapp.com",
  projectId: "minehouse-app",
  storageBucket: "minehouse-app.appspot.com",
  messagingSenderId: "952869369872",
  appId: "1:952869369872:web:a87cc93473928ae0593295"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()