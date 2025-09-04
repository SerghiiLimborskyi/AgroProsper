// AgroStorage.js — автономний DAO-модуль для контролю доступу

// 🔐 Список DAO-адміністраторів (можна розширити або зробити динамічним)
const adminList = [
  "0xA1b2C3D4E5F6G7H8I9J0", // Serhii DAO
  "0xF7E8D9C0B1A2D3E4F5G6"  // Trusted Agent
];

// 📁 CID-індекс — мапа CID → шлях до файлу
const cidIndex = {
  "b3f1c2a9e4d1": "MediaKit/AgroProsper.zip",
  "c7d8e3e2f9a0": "Docs/dao.html",
  "f1a3b7d4c6e8": "Docs/slide1.html",
  "a1b2c3e9f0d2": "Docs/slide2.html",
  "b7c8d9c3d4e5": "Transcripts/quests.json",
  "f8e7d6a2b3c4": "DAO-Logs/updateCID.yml",
  "d1e2f3e4f5a6": "Badges/votingPanel.jsx"
};

// 🧠 Перевірка, чи адреса є DAO-адміном
function verifyAdmin(address) {
  return adminList.includes(address.trim());
}

// 📊 Отримання рівня доступу (можна розширити на ролі)
function getAccessLevel(address) {
  if (verifyAdmin(address)) return "admin";
  return "guest";
}

// 🚪 Запит доступу до CID
function requestAccess(cid) {
  const userAddress = prompt("🔐 Введіть вашу DAO-адресу:");
  const accessLevel = getAccessLevel(userAddress);

  if (accessLevel === "admin") {
    alert("✅ Доступ дозволено до CID: " + cid);
    window.location.href = cidIndex[cid];
  } else {
    alert("⛔ Доступ заборонено. Ви не є DAO-адміном.");
  }
}

// 📥 Експорт функцій для використання в HTML
export { verifyAdmin, getAccessLevel, requestAccess, cidIndex };
