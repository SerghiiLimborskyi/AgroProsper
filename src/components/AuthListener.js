// src/components/AuthListener.js

import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthListener = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "1rem", background: "#f0f0f0" }}>
      {user ? (
        <p>✅ Увійшов як: {user.email}</p>
      ) : (
        <p>⛔ Користувач не авторизований</p>
      )}
    </div>
  );
};

export default AuthListener;
