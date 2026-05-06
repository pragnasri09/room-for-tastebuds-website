import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2X_A-4d8t1ibrbvfshq14j-L5WCf2hIA",
  authDomain: "room-for-tastebuds.firebaseapp.com",
  projectId: "room-for-tastebuds",
  storageBucket: "room-for-tastebuds.firebasestorage.app",
  messagingSenderId: "155323670235",
  appId: "1:155323670235:web:aff4ed356bab3b22cc76fe"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);