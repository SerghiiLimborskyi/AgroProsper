// src/components/Dashboard.js
import React from "react";

const Dashboard = ({ user, onSignOut }) => {
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
