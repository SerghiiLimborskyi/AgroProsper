import React from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Увійдіть до AgroProsper</h2>
      <button onClick={handleSignIn}>Увійти через Google</button>
    </div>
  );
};

export default Login;
