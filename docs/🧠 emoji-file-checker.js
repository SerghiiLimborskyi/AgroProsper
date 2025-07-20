// 🧠 Emoji File Checker — DAO Studio
// Сканує файли DAO та виводить їхні ролі за emoji у назві

const emojiList = {
  "🧩": "PuzzleNode / модуль структури",
  "🎬": "Медіа / трейлер",
  "📘": "Документ / презентація",
  "🧠": "Памʼять / логіка",
  "🕊️": "Етика / добродійність"
};

const daoFiles = [
  "🧩 banner-block.html",
  "🎬 dao-video.html",
  "📘 studio-summary.pdf",
  "🧠 memory-builder.js",
  "🕊️ dao-humble-mode.html"
];

daoFiles.forEach(file => {
  const emoji = file.match(/^[\u{1F300}-\u{1FAFF}]/u)?.[0];
  const role = emojiList[emoji] || "Невідомо";

  console.log(`📂 ${file} — Роль: ${role}`);
});
📂 🧩 banner-block.html — Роль: PuzzleNode / модуль структури
📂 🎬 dao-video.html — Роль: Медіа / трейлер
📂 📘 studio-summary.pdf — Роль: Документ / презентація
📂 🧠 memory-builder.js — Роль: Памʼять / логіка
📂 🕊️ dao-humble-mode.html — Роль: Етика / добродійність
