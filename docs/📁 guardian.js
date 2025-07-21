const allowedSymbols = ["🧠", "🧩", "✨", "🌍", "🎮", "📘", "🕊️", "🔐", "🛡️"];
const checkEmoji = name => allowedSymbols.some(sym => name.includes(sym));

function launchDAO() {
  const file = "🧠DAO-Studio-v6.html";
  if (checkEmoji(file)) {
    alert("✅ DAO Studio запущено!");
    location.href = "studio-dashboard.html";
  } else {
    alert("⚠️ Смайлик у файлі не авторизований DAO Protocol.");
  }
}
