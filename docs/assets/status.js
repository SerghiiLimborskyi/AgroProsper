async function loadRepoStatus() {
  const base = "https://api.github.com/repos/SerghiiLimborskyi/AgroProsper/contents/";
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
    if (res.ok) {
      li.textContent = `✅ ${label}`;
    } else {
      li.textContent = `❌ ${label}`;
    }
    list.appendChild(li);
  }

  const updated = document.getElementById("last-updated");
  updated.textContent = `Оновлено: ${new Date().toLocaleDateString()}`;
}

document.addEventListener("DOMContentLoaded", loadRepoStatus);
