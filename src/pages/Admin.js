// src/components/Admin.js
import React from "react";

const Admin = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>👨‍💼 Адмін-панель</h1>
      <p>Тут буде контент для адміністраторів.</p>
  const allowedAdmins = [
  "serhiilimborskyi@gmail.com", // твоя адреса
  "example@domain.com"          // додаткові адреси
];
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Admin = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    const allowedAdmins = ["serhiilimborskyi@gmail.com", "example@domain.com"];

    if (!user || !allowedAdmins.includes(user.email)) {
      navigate("/"); // перенаправити, якщо не адмін
    }
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>👨‍💼 Адмін-панель</h1>
      <p>Тут буде контент для адміністраторів.</p>
    </div>
  );
};

export default Admin;

    </div>
  );
};

export default Admin;
