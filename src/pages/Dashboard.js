// src/components/Dashboard.js
import React from "react";
import { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

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


const Dashboard = ({ user, onSignOut }) => {
  useEffect(() => {
  logEvent(analytics, 'screen_view', { screen_name: 'Dashboard' });
}, []);

const handleModuleOpen = (moduleName) => {
  logEvent(analytics, 'dao_module_opened', {
    module_name: moduleName,
    user_id: user?.uid || 'guest'
  });
};

  useEffect(() => {
  logEvent(analytics, 'screen_view', {
    screen_name: 'Dashboard'
  });
}, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AgroProsper 🌾</h1>
      <p>👋 Вітаємо, {user.displayName}</p>
      <img src={user.photoURL} alt="User avatar" width={100} />
      <br />
      <button onClick={onSignOut}>Вийти</button>
      <div style={{ marginTop: "2rem" }}>
        <h2>📦 Ваші дані</h2>
        <p>Тут буде контент, доступний лише авторизованим користувачам.</p>
      </div>
    </div>
  );
};

export default Dashboard;
