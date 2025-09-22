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
  alert("Доступ до Храму Спадщини відкрит
