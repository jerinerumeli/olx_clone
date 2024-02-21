// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbuAHyyLrJNdhBb0MWrwpeejVhvwdYaz8",
  authDomain: "fir-c9d6b.firebaseapp.com",
  projectId: "fir-c9d6b",
  storageBucket: "fir-c9d6b.appspot.com",
  messagingSenderId: "420776191452",
  appId: "1:420776191452:web:f4d06cf43d7d1f4b36db19",
  measurementId: "G-12Y8RSSJ4C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const DB = getFirestore(app);
// const analytics = getAnalytics(app);