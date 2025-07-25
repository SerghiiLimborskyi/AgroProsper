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

  const statusList = document.getElementById("status-list");
  statusList.innerHTML = "";

  Object.entries(elements).forEach(([label, el]) => {
    const status = el ? "✅" : "❌";
    const li = document.createElement("li");
    li.textContent = `${status} ${label}`;
    statusList.appendChild(li);
  });

  const updated = document.getElementById("last-updated");
  updated.textContent = `Оновлено: ${new Date().toLocaleString("uk-UA")}`;
});
