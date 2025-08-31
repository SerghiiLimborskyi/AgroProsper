// src/App.js

import RegisterForm from './RegisterForm';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Home() {
  return (
    <div>
      <h1>AgroProsper DAO</h1>
      <p>Ласкаво просимо до платформи цифрового агросамоврядування</p>
    </div>
  );
}

function DAOAnalytics() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['✅ За', '❌ Проти'],
        datasets: [{
          label: 'Голосування #42',
          data: [128, 34],
          backgroundColor: ['#00FF66', '#FF4444']
        }]
      }
    });
  }, []);

  return (
    <div>
      <h2>📊 DAO-аналітика</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="mb-6 space-x-4">
        <Link to="/">Головна</Link>
        <Link to="/dao">DAO-аналітика</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dao" element={<DAOAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;

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
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  <Routes>
 <Route path="/register" element={<RegisterForm />} />
  <Route path="/login" element={<Login onSignIn={handleSignIn} />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={
    <ProtectedRoute user={user}>
      <Dashboard user={user} onSignOut={handleSignOut} />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={
    <ProtectedRoute user={user}>
      <Admin />
    </ProtectedRoute>
  } />
  <Route path="/register" element={<RegisterForm />} /> {/* 🔥 Новий маршрут */}
</Routes>


  if (loading) return <p>Завантаження...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} onSignOut={handleSignOut} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
