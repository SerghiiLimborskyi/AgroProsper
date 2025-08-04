import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminManager = () => {
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const snapshot = await getDocs(collection(db, "admins"));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      email: doc.data().email
    }));
    setAdmins(list);
  };

  const addAdmin = async () => {
    if (!email) return;
    await addDoc(collection(db, "admins"), { email });
    setEmail("");
    fetchAdmins();
  };

  const removeAdmin = async (id) => {
    await deleteDoc(doc(db, "admins", id));
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👥 Керування адміністраторами</h2>
      <input
        type="email"
        placeholder="Email нового адміна"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addAdmin}>➕ Додати</button>

      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.email}
            <button onClick={() => removeAdmin(admin.id)}>❌ Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminManager;
