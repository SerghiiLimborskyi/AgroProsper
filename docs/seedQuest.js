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
    case "study":
      directorBot.mintBadge("Historian");
      greenCredits += 5;
      directorBot.log("📖 Гравець вивчив щоденник. +5 кредитів");
      showScene("researchScene");
      break;
    case "lab":
      directorBot.mintBadge("LabCourier");
      greenCredits += 3;
      directorBot.log("🧪 Насіння передано до лабораторії. +3 кредитів");
      showScene("researchScene");
      break;
    case "plant":
      directorBot.mintBadge("FieldStarter");
      greenCredits += 7;
      directorBot.log("🌾 Насіння висаджено. +7 кредитів");
      showScene("researchScene");
      break;
    case "poll":
      showScene("daoVoteScene");
      break;
    case "pause":
      directorBot.log("⏸️ Дослідження призупинено");
      showScene("daoVoteScene");
      break;
    case "continue":
      greenCredits += 2;
      directorBot.log("🔍 Гравець продовжив самостійно. +2 кредитів");
      showScene("daoVoteScene");
      break;
  }
}

function vote(option) {
  switch (option) {
    case "community":
      greenCredits += 10;
      directorBot.mintBadge("CommunityGrower");
      directorBot.log("🌾 Обрано спільний врожай. +10 кредитів");
      break;
    case "lab":
      greenCredits += 5;
      directorBot.mintBadge("TechPusher");
      directorBot.log("🧪 Обрано лабораторію. +5 кредитів");
      break;
    case "heritage":
      greenCredits += 8;
      directorBot.mintBadge("HeritageKeeper");
      directorBot.log("🛡️ Обрано спадщину. +8 кредитів");
      break;
  }
  showScene("finalScene");
}

function redeemCredits() {
  directorBot.log(`💰 Кредити обміняно: ${greenCredits}`);
  alert(`Ви обміняли ${greenCredits} зелених кредитів на новий інструмент.`);
  greenCredits = 0;
}

function openTemple() {
  directorBot.log("🚪 Відкрито Храм Спадщини");
  alert("Ви отримали доступ до Храму Спадщини.");
}
