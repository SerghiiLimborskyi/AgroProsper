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
  });
}
