// src/pages/Dashboard.js
import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import i18n from "../i18n"; // імпорт i18n, якщо використовується
import React, { useEffect } from "react";
import { logAppEvent } from "../utils/analytics";

const Dashboard = ({ user, onSignOut }) => {
  useEffect(() => {
    logAppEvent("screen_view", { screen_name: "Dashboard" });
    logAppEvent("language_selected", {
      language: navigator.language || "unknown"
    });
  }, []);

  const handleSignOut = () => {
    logAppEvent("sign_out", { method: "manual", user_id: user?.uid || "guest" });
    onSignOut();
  };

  const handleModuleOpen = (moduleName) => {
    logAppEvent("dao_module_opened", {
      module_name: moduleName,
      user_id: user?.uid || "guest"
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AgroProsper 🌾</h1>
      <p>👋 Вітаємо, {user.displayName}</p>
      <img src={user.photoURL} alt="User avatar" width={100} />
      <button onClick={handleSignOut}>Вийти</button>
      <button onClick={() => handleModuleOpen("Finance")}>Відкрити DAO Finance</button>
    </div>
  );
};

export default Dashboard;

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
    logEvent(analytics, "screen_view", { screen_name: "Dashboard" });
    logEvent(analytics, "language_selected", {
      language: i18n?.language || navigator.language || "unknown"
    });
  }, []);

  const handleSignOut = () => {
    logEvent(analytics, "sign_out", { method: "manual", user_id: user?.uid || "guest" });
    onSignOut();
  };

  const handleModuleOpen = (moduleName) => {
    logEvent(analytics, "dao_module_opened", {
      module_name: moduleName,
      user_id: user?.uid || "guest"
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AgroProsper 🌾</h1>
      <p>👋 Вітаємо, {user.displayName}</p>
      <img src={user.photoURL} alt="User avatar" width={100} />
      <br />
      <button onClick={handleSignOut}>Вийти</button>

      <div style={{ marginTop: "2rem" }}>
        <h2>📦 Ваші дані</h2>
        <p>Тут буде контент, доступний лише авторизованим користувачам.</p>
        <button onClick={() => handleModuleOpen("Finance")}>Відкрити DAO Finance</button>
      </div>
    </div>
  );
};

export default Dashboard;
