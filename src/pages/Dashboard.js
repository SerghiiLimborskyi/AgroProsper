// src/pages/Dashboard.js

import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Завантаження...</p>;
  if (!user) return <p>⛔ Доступ заборонено. Увійдіть, щоб переглянути панель.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📈 Панель користувача</h1>
      <p>👋 Вітаємо, {user.displayName}</p>
      <img src={user.photoURL} alt="User avatar" width={100} />
      <br />
      <button onClick={() => signOut(auth)}>Вийти</button>
    </div>
  );
}

export default Dashboard;
