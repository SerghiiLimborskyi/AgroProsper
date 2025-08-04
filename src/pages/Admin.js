// src/components/Admin.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Admin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const user = auth.currentUser;
      if (!user) return navigate("/");

      const snapshot = await getDocs(collection(db, "admins"));
      const emails = snapshot.docs.map(doc => doc.data().email);

      if (emails.includes(user.email)) {
        setIsAllowed(true);
      } else {
        navigate("/");
      }
    };

    checkAdminAccess();
  }, []);

  if (!isAllowed) return null;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>👨‍💼 Адмін-панель</h1>
      <p>Тут буде контент для адміністраторів.</p>
    </div>
  );
};

export default Admin;

