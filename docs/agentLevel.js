// agentLevel.js — оновлення ролі агента за DAO-прогресом

document.addEventListener("DOMContentLoaded", () => {
  const completed = JSON.parse(localStorage.getItem("completedQuests") || "[]");
  const questCount = completed.length;

  let newLevel = "Starter";

  if (questCount >= 1 && questCount < 3) {
    newLevel = "Farmer";
  } else if (questCount >= 3 && questCount < 5) {
    newLevel = "Trader";
  } else if (questCount >= 5) {
    newLevel = "Agent";
  }

  const currentLevel = localStorage.getItem("agentLevel") || "Starter";

  if (currentLevel !== newLevel) {
    localStorage.setItem("agentLevel", newLevel);
    console.log(`🔄 Роль оновлено: ${currentLevel} → ${newLevel}`);

    // Опціонально: оновити CID (якщо підтримується)
    if (typeof updateCID === "function") {
      updateCID(newLevel);
    }

    // Вивід на сторінці (якщо є елемент)
    const levelDisplay = document.getElementById("agentLevel");
    if (levelDisplay) {
      levelDisplay.textContent = newLevel;
    }
  }
});
