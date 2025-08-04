// src/pages/AdminManager.js
import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // ... той самий конфіг
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const AdminManager = ({ user }) => {
  useEffect(() => {
    logEvent(analytics, "screen_view", { screen_name: "AdminManager" });
    logEvent(analytics, "admin_accessed", { user_id: user?.uid || "guest" });
  }, []);

  const handleAction = (actionType) => {
    logEvent(analytics, "admin_action", {
      action: actionType,
      user_id: user?.uid || "guest"
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛠️ Панель адміністратора</h1>
      <button onClick={() => handleAction("approve_user")}>Схвалити користувача</button>
      <button onClick={() => handleAction("delete_entry")}>Видалити запис</button>
    </div>
  );
};

export default AdminManager;
