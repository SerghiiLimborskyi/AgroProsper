// src/components/Login.js
import React from "react";
const handleLogin = async () => {
  await signInWithPopup(auth, provider);
  logEvent(analytics, 'login', { method: 'Google' });
};

const Login = ({ onSignIn }) => {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AgroProsper 🌾</h1>
      <p>🔐 Увійдіть, щоб отримати доступ до платформи</p>
      <button onClick={onSignIn}>Увійти через Google</button>
    </div>
  );
};

export default Login;
