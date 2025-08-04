// src/App.js

import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AgroProsper 🌾</h1>
      {user ? (
        <div>
          <p>👋 Вітаємо, {user.displayName}</p>
          <img src={user.photoURL} alt="User avatar" width={100} />
          <br />
          <button onClick={handleSignOut}>Вийти</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Увійти через Google</button>
      )}
    </div>
  );
}

export default App;
