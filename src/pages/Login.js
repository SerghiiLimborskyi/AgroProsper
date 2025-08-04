// Перевірка чи користувач вже існує
const userRef = doc(db, "users", user.uid);
const userSnap = await getDoc(userRef);

if (!userSnap.exists()) {
  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: "user", // 👈 стандартна роль
    createdAt: new Date().toISOString()
    import { getDoc, doc, setDoc } from "firebase/firestore";

const handleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // 🔐 Якщо користувач новий — створити запис
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
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

  });
}
