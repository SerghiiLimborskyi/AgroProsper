// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/dashboard" element={<Dashboard />} />

import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

const handleSignOut = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};

    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AgroProsper 🌾</h1>
      {user ? (
        <div>
          <p>👋 Вітаємо, {user.displayName}</p>
          <img src={user.photoURL} alt="User avatar" width={100} />
          <br />
          <button onClick={handleSignOut}>Вийти</button>

          {/* 🔐 Захищений контент */}
          <div style={{ marginTop: "2rem" }}>
            <h2>📦 Ваші дані</h2>
            <p>Тут буде контент, доступний лише авторизованим користувачам.</p>
          </div>
        import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

<Route path="/admin" element={<Admin />} />
<Route path="/dashboard" element={<Dashboard />} />

        </div>
      ) : (
        <button onClick={handleSignIn}>Увійти через Google</button>
      )}
    </div>
  );
}

export default App;
