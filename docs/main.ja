// main.js — DAO-інтерфейс і статус користувача

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderUserStatus();
});

function renderMenu() {
  const menu = document.getElementById("menuContainer");
  if (!menu) return;

  menu.innerHTML = `
    <h3>🧭 DAO Навігація</h3>
    <button onclick="navigate('start.html')">🌱 Портал DAO</button>
    <button onclick="navigate('admin-dashboard.html')">⚙️ Панель адміністратора</button>
    <button onclick="navigate('admin-analytics.html')">📊 Аналітика</button>
    <button onclick="navigate('daoManifesto.html')">📖 Кодекс DAO</button>
    <button onclick="navigate('legacyArchive.html')">🗂️ Архів спадщини</button>
    <button onclick="navigate('ecoMap.html')">🗺️ Еко-мапа</button>
    <button onclick="navigate('nightField.html')">🌌 Нічне поле</button>
  `;
}

function navigate(url) {
  window.location.href = url;
}

function renderUserStatus() {
  const cid = localStorage.getItem("userCID");
  if (!cid) return;

  const statusBlock = document.createElement("div");
  statusBlock.style.marginTop = "30px";
  statusBlock.innerHTML = `
    <h3>👤 Статус користувача</h3>
    <p><strong>CID:</strong> ${cid}</p>
    <p><strong>Роль:</strong> ${getRoleFromCID(cid)}</p>
    <p><strong>Титул:</strong> ${getTitleFromCID(cid)}</p>
  `;
  document.body.appendChild(statusBlock);
}

function getRoleFromCID(cid) {
  if (cid.includes("-PA")) return "🤝 Партнер";
  if (cid.includes("-AG")) return "🛠️ Агент";
  if (cid.includes("-AN")) return "🌿 Дослідник";
  return "👤 Гість";
}

function getTitleFromCID(cid) {
  if (cid.includes("-PA")) return "Етичний Архітектор";
  if (cid.includes("-AG")) return "Виконавець DAO";
  if (cid.includes("-AN")) return "Зберігач Землі";
  return "Новачок DAO";
}
