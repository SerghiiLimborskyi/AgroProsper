import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Home = () => {
  const user = auth.currentUser;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AgroProsper 🌾</h1>
      <p>👋 Вітаємо, {user.displayName}</p>
      <img src={user.photoURL} alt="User avatar" width={100} />
      <br />
      <button onClick={() => signOut(auth)}>Вийти</button>
    </div>
  );
};

export default Home;
