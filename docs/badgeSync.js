// 🔄 Локальна синхронізація бейджів без IPFS-токенів
async function syncBadgesLocally() {
  const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
  if (!achievements.length) {
    alert("❗ Немає бейджів для синхронізації");
    return;
  }

  for (let badge of achievements) {
    if (badge.cid) continue; // вже має CID

    // 🧬 Генеруємо фейковий CID
    const fakeCID = "bafkre" + Math.random().toString(36).substring(2, 12);
    badge.cid = fakeCID;
    console.log(`✅ ${badge.title} → ipfs://${fakeCID}`);
  }

  localStorage.setItem("achievements", JSON.stringify(achievements));
  alert("✅ Локальна синхронізація завершена");
}

// 📦 Кнопка для запуску
document.addEventListener("DOMContentLoaded", () => {
  const syncBtn = document.createElement("button");
  syncBtn.textContent = "🔄 Локальна синхронізація бейджів";
  syncBtn.style = `
    margin: 20px;
    padding: 10px;
    background: #ccc;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  `;
  syncBtn.onclick = syncBadgesLocally;
  document.body.appendChild(syncBtn);
});
