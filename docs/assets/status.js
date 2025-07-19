async function loadRepoStatus() {
  const base = "https://api.github.com/repos/SerghiiLimborskyi/AgroProsper/contents/docs/";
  const components = {
    "index.html": "🌐 Головна сторінка",
    "status.html": "📊 Статус DAO",
    "vote.html": "🗳️ Голосування",
    "card.html": "🆔 NFT-картка",
    "promo.html": "🎬 Промо-сторінка",
    "assets/logo.svg": "🖼️ Логотип",
    "assets/banner.jpg": "🌄 Банер",
    "assets/style.css": "🎨 Стилі",
    "assets/promo.mp4": "🎞️ Відео",
    "assets/guide.pdf": "📄 PDF-гайд",
    "assets/lang.js": "🌍 Перемикач мов",
    "assets/status.js": "⚙️ Статус-скрипт"
  };

  const list = document.getElementById("status-list");
  list.innerHTML = "";

  for (const [path, label] of Object.entries(components)) {
    const res = await fetch(base + path);
    const li = document.createElement("li");
    li.textContent = res.ok ? `✅ ${label}` : `❌ ${label}`;
    list.appendChild(li);
  }

  const updated = document.getElementById("last-updated");
  updated.textContent = `Оновлено: ${new Date().toLocaleDateString()}`;
}

document.addEventListener("DOMContentLoaded", loadRepoStatus);
fetch("status.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("dao-status");
    if (container) {
      container.innerHTML = `
        <h2>📊 Стан DAO</h2>
        <ul style="list-style:none; padding-left:0; font-size:1.1em;">
          <li><strong>Версія:</strong> ${data.version}</li>
          <li><strong>Дата генерації:</strong> ${new Date(data.date).toLocaleDateString("uk-UA")}</li>
          <li><strong>Стан збірки:</strong> ✅ ${data.build}</li>
          <li><strong>Наступний крок:</strong> ${data.next}</li>
        </ul>
      `;
    }
  });
