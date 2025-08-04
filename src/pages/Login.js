// src/pages/Login.js
import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // ... той самий конфіг, що й у Dashboard.js
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Login = ({ onLogin }) => {
  useEffect(() => {
    logEvent(analytics, "screen_view", { screen_name: "Login" });
  }, []);

  const handleLogin = () => {
    logEvent(analytics, "login_attempt", { method: "Google" });
    onLogin(); // виклик функції логіну
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔐 Увійти до AgroProsper</h1>
      <button onClick={handleLogin}>Увійти через Google</button>
    </div>
  );
};

export default Login;
