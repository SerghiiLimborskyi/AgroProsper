const releaseDate = new Date("2025-09-10T12:00:00Z"); // дата релізу
function updateTimer() {
  const now = new Date();
  const diff = releaseDate - now;
  if (diff <= 0) {
    document.getElementById("versionTimer").innerHTML = "🚀 Нова версія вже доступна!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("versionTimer").innerHTML =
    `⏳ Нова версія DAO вийде через: ${days} дн. ${hours} год. ${minutes} хв.`;
}
setInterval(updateTimer, 60000);
window.addEventListener("load", updateTimer);
