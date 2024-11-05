// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log('Firebase Config:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

// Debug: Log environment variable access
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  allEnv: process.env
});

// Temporary direct config for testing
const firebaseConfig = {
  apiKey: "AIzaSyB9TsRk2wf-rEgAB8TyzqszDjHSUwfPxcc",
  authDomain: "fire-wood-c69f3.firebaseapp.com",
  projectId: "fire-wood-c69f3",
  storageBucket: "fire-wood-c69f3.appspot.com",
  messagingSenderId: "161130091457",
  appId: "1:161130091457:web:4d796fcc4751b543a25540",
  measurementId: "G-2073LQCJ3Z"
};

// Add error checking
if (!firebaseConfig.projectId) {
  throw new Error('Firebase projectId is missing. Check your environment variables.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Initialize services
const db = getFirestore(app);

// Export services
export { auth, db, storage };
export default app;