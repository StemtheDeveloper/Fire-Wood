// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9TsRk2wf-rEgAB8TyzqszDjHSUwfPxcc",
  authDomain: "fire-wood-c69f3.firebaseapp.com",
  projectId: "fire-wood-c69f3",
  storageBucket: "fire-wood-c69f3.appspot.com",
  messagingSenderId: "161130091457",
  appId: "1:161130091457:web:4d796fcc4751b543a25540",
  measurementId: "G-2073LQCJ3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { storage, auth, firestore };