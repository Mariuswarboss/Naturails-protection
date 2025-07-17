// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
// This is read from environment variables to keep your secrets secure.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase for SSR and SSG, and prevent re-initialization on the client
let app;
if (!getApps().length) {
    if (Object.values(firebaseConfig).every(value => value)) {
        app = initializeApp(firebaseConfig);
    } else {
        console.error("Firebase config is missing one or more required values.");
    }
} else {
    app = getApp();
}


export { app };
