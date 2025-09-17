// badgeViewer.js — перегляд локальних DAO-бейджів з CID

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("badgeContainer");
  if (!container) return;

  const badges = JSON.parse(localStorage.getItem("achievements") || "[]");
  if (badges.length === 0) {
    container.innerHTML = "<p>😔 Бейджі ще не видано.</p>";
    return;
  }

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📤 Експортувати в CID-index.json";
  exportBtn.style = "margin:20px;padding:10px;background:#00ccff;border:none;border-radius:8px;font-weight:bold;";
  exportBtn.onclick = () => exportCIDIndex(badges);
  container.appendChild(exportBtn);

  badges.forEach(badge => {
    const card = document.createElement("div");
    card.className = "badge-card";

    card.innerHTML = `
      <img src="${badge.img}" alt="${badge.title}" title="${badge.title}" />
      <h4>${badge.title}</h4>
      <p>${badge.desc}</p>
      <p>🕒 ${badge.date || new Date().toLocaleDateString()}</p>
      <p>🧬 CID: ${badge.cid || "—"}</p>
      <p>🎯 Роль: ${badge.role || "guest"}</p>
      <p>📡 Джерело: ${badge.source || "DAO"}</p>
      <p>⭐ Рейтинг: ${badge.rating || "—"}</p>
      ${badge.cid ? `<small><a href="https://ipfs.io/ipfs/${badge.cid}" target="_blank">🔗 Переглянути на IPFS</a></small>` : ""}
    `;

    container.appendChild(card);
  });
});

// 📤 Експорт у CID-index.json
function exportCIDIndex(badges) {
  const index = {};
  badges.forEach(badge => {
    if (badge.cid) index[badge.cid] = badge.title;
  });

  const blob = new Blob([JSON.stringify(index, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "CID-index.json";
  link.click();

  URL.revokeObjectURL(url);
}
