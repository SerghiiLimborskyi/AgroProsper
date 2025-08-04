// src/pages/Signup.js

import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Помилка реєстрації: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📝 Реєстрація в AgroProsper</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignup}>Зареєструватися</button>
    </div>
  );
};

export default Signup;
