// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS9FV7uL9qVcfphpIl8dtnmW-3BvVBwpo",
  authDomain: "gamerecap-a2fd2.firebaseapp.com",
  projectId: "gamerecap-a2fd2",
  storageBucket: "gamerecap-a2fd2.appspot.com",
  messagingSenderId: "308594953617",
  appId: "1:308594953617:web:ebb9eac5938fc1318c1e30",
  measurementId: "G-W1LKVBBSFM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
