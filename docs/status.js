async function loadRepoStatus() {
  const response = await fetch("https://api.github.com/repos/SerghiiLimborskyi/AgroProsper/contents/docs");
  const files = await response.json();

  const list = document.getElementById("status-list");
  list.innerHTML = "";

  files.forEach(file => {
    const li = document.createElement("li");
    li.textContent = `📄 ${file.name}`;
    list.appendChild(li);
  });

  const updated = document.getElementById("last-updated");
  updated.textContent = `Оновлено: ${new Date().toLocaleDateString()}`;
}
document.addEventListener("DOMContentLoaded", loadRepoStatus);
document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    "🌐 Головна сторінка": document.querySelector("body"),
    "🖼️ Логотип": document.getElementById("logo"),
    "🌄 Банер": document.getElementById("banner"),
    "🎞️ Відео": document.getElementById("promo-video"),
    "📄 PDF-гайд": document.getElementById("pdf-guide"),
    "🌍 Перемикач мов": document.getElementById("lang-switcher"),
    "🎬 Промо-сторінка": document.getElementById("promo-page"),
    "🎨 Стилі": document.styleSheets.length > 0 ? true : null
  };

  const statusContainer = document.getElementById("dao-status");
  statusContainer.innerHTML = "<h3>📊 Статус DAO</h3>";

  Object.entries(elements).forEach(([label, el]) => {
    const status = el ? "✅" : "❌";
    const item = document.createElement("p");
    item.textContent = `${status} ${label}`;
    statusContainer.appendChild(item);
  });
});
