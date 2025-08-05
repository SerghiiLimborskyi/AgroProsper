// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "agroprosper-1749411381988.firebaseapp.com",
  projectId: "agroprosper-1749411381988",
  storageBucket: "agroprosper-1749411381988.appspot.com",
  messagingSenderId: "398072332519",
  appId: "1:398072332519:web:6a99edec387576e5e96242",
  measurementId: "G-H36REQ6J6Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
