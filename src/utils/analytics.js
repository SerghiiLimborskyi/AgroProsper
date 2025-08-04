// src/utils/analytics.js
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { logAppEvent } from "../utils/analytics";

const logAppEvent = (eventName, payload = {}) => {
  console.log(`[Analytics] ${eventName}`, payload);
};

const firebaseConfig = {
  apiKey: "AIzaSyCky1vtPkr0p_Mzs6bCrlLqWAT1jK6fFTg",
  authDomain: "agroprosper-1749411381988.firebaseapp.com",
  projectId: "agroprosper-1749411381988",
  storageBucket: "agroprosper-1749411381988.firebasestorage.app",
  messagingSenderId: "398072332519",
  appId: "1:398072332519:web:6a99edec387576e5e96242",
  measurementId: "G-H36REQ6J6Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Централізована функція логування
export const logAppEvent = (eventName, eventParams = {}) => {
  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error("Analytics error:", error);
  }
};
