import { auth, db } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // 🔐 Створити користувача, якщо не існує
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user", // 👈 стандартна роль
          createdAt: new Date().toISOString()
        });
      }

      // 🔍 Отримати роль користувача
      const updatedSnap = await getDoc(userRef);
      const userData = updatedSnap.data();

      // 🚀 Перенаправлення за роллю
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

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
