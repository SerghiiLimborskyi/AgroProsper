let currentScene = "introScene";
let greenCredits = 0;

function showScene(id) {
  document.querySelectorAll(".scene").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
  currentScene = id;
  directorBot.updateStatus(`📍 Сцена: ${id}`);
  directorBot.log(`➡️ Перехід до сцени: ${id}`);
}

function startQuest() {
  directorBot.mintBadge("AgentOfGood");
  showScene("archiveScene");
}

function chooseAction(action) {
  switch (action) {
    case "study": directorBot.mintBadge("Historian"); greenCredits += 5; break;
    case "lab": directorBot.mintBadge("LabCourier"); greenCredits += 3; break;
    case "plant": directorBot.mintBadge("FieldStarter"); greenCredits += 7; break;
    case "poll": showScene("daoVoteScene"); return;
    case "pause": directorBot.log("⏸️ Призупинено"); showScene("daoVoteScene"); return;
    case "continue": greenCredits += 2; break;
  }
  showScene("researchScene");
}

function vote(option) {
  switch (option) {
    case "community": greenCredits += 10; directorBot.mintBadge("CommunityGrower"); break;
    case "lab": greenCredits += 5; directorBot.mintBadge("TechPusher"); break;
    case "heritage": greenCredits += 8; directorBot.mintBadge("HeritageKeeper"); break;
  }
  showScene("finalScene");
}

function redeemCredits() {
  directorBot.log(`💰 Кредити обміняно: ${greenCredits}`);
  alert(`Ви обміняли ${greenCredits} зелених кредитів.`);
  greenCredits = 0;
}

function openTemple() {
  directorBot.log("🚪 Відкрито Храм Спадщини");
  showScene("templeScene");

  const summary = document.getElementById("legacySummary");
  summary.innerHTML = `
    <li>Кредити: ${greenCredits}</li>
    <li>Бейджі: ${directorBot.badges.join(", ")}</li>
    <li>Остання сцена: ${currentScene}</li>
  `;

  const title = greenCredits >= 20 ? "Зберігач Землі" :
                greenCredits >= 10 ? "Етичний Архітектор" :
                "DAO-Новачок";
  document.getElementById("legacyTitle").textContent = title;
}

function mintLegacyNFT() {
  const title = document.getElementById("legacyTitle").textContent;
  directorBot.mintBadge(`Legacy:${title}`);
  directorBot.log(`🏅 NFT-бейдж “Legacy:${title}” видано`);
  alert(`Вам видано NFT-бейдж “${title}”`);
}

function recordLegacy() {
  directorBot.log("📜 Гравець записаний у Книгу Спадщини");
  alert("Ваш профіль записано в DAO
