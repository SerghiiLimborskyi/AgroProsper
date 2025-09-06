// 📊 CID-аналітика
const cidStats = {
  data: { guests: 0, agents: 0, partners: 0, total: 0 },
  scanCID: function () {
    const cid = localStorage.getItem("cid");
    if (!cid) return;
    this.data.total++;
    if (cid.startsWith("0xGUEST")) this.data.guests++;
    else if (cid.startsWith("0xAGRO")) this.data.agents++;
    else if (cid.startsWith("0xPARTNER")) this.data.partners++;
    this.displayStats();
  },
  displayStats: function () {
    const statsBox = document.getElementById("cidStats");
    if (statsBox) {
      statsBox.innerHTML = `
        <h3>📊 CID-аналітика</h3>
        <p>Гостей: ${this.data.guests}</p>
        <p>Агентів: ${this.data.agents}</p>
        <p>Партнерів: ${this.data.partners}</p>
        <p>Всього: ${this.data.total}</p>
      `;
    }
  }
};

// 🎨 Студія бейджів
const badgeStudio = {
  generate: function () {
    const name = document.getElementById("badgeName").value;
    const role = document.getElementById("badgeRole").value;
    const desc = document.getElementById("badgeDesc").value;
    const preview = document.getElementById("badgePreview");
    if (preview) {
      preview.innerHTML = `
        <h2>${name}</h2>
        <p>Роль: ${role}</p>
        <p>${desc}</p>
        <p>🟢 Бейдж готовий до DAO-погодження</p>
      `;
    }
  }
};

// 🎮 Інтеграція бейджів у гру
const gameBadge = {
  show: function () {
    const cid = localStorage.getItem("cid");
    if (cid && cid.startsWith("0xGUEST")) {
      const badgeBox = document.getElementById("gameBadge");
      if (badgeBox) {
        badgeBox.innerHTML = `
          <h3>🎮 Ви отримали бейдж: Гравець DAO</h3>
          <img src="badges/player.svg" alt="Player Badge" width="80" />
        `;
      }
    }
  }
};

// ⚛️ Квантовий прогноз дій
const quantumCID = {
  predictAction: function (cid) {
    if (!cid) return "Немає CID";
    const entropy = cid.length * Math.random();
    if (entropy < 50) return "🧠 Імовірність: перегляд відео";
    if (entropy < 100) return "🧠 Імовірність: участь у квесті";
    return "🧠 Імовірність: оновлення статусу";
  },
  displayPrediction: function () {
    const cid = localStorage.getItem("cid");
    const prediction = this.predictAction(cid);
    const box = document.getElementById("quantumBox");
    if (box) box.innerText = prediction;
  }
};

// 🚀 Автозапуск при завантаженні
window.addEventListener("load", () => {
  cidStats.scanCID();
  gameBadge.show();
  quantumCID.displayPrediction();
});
