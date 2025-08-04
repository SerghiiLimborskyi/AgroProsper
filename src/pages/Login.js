// src/pages/Login.js

import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Помилка входу: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔐 Вхід до AgroProsper</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Увійти</button>
    </div>
  );
};

export default Login;
