const directorBot = {
  approvedCID: ["0xAGRO-7F3A", "0xAGRO-9C88"],

  log: function (message) {
    const logBox = document.getElementById("botLog");
    if (logBox) {
      logBox.innerHTML += `${message}<br>`;
    } else {
      console.warn("⚠️ botLog не знайдено");
    }
  },

  checkCID: function () {
    const cid = localStorage.getItem("cid");
    if (!cid) {
      alert("🔐 CID не знайдено. Увійдіть через DAO-панель.");
      this.log("⛔ CID не знайдено");
      return false;
    }
    if (!this.approvedCID.includes(cid)) {
      alert("⛔ CID не має прав Бізнес-Партнера.");
      this.log(`⛔ CID не авторизовано: ${cid}`);
      return false;
    }
    this.log(`✅ CID підтверджено: ${cid}`);
    return true;
  },

  scanPages: function () {
    const pages = [
      "index.html", "about.html", "video.html", "dashboard.html",
      "badges.html", "contact.html", "support.html", "quests.html",
      "slide2.html", "slide3.html", "slide4.html", "slide5.html"
    ];
    pages.forEach(page => {
      fetch(page)
        .then(res => {
          if (!res.ok) {
            this.log(`❌ ${page} — не знайдено`);
          } else {
            this.log(`✅ ${page} — доступна`);
          }
        })
        .catch(() => this.log(`⚠️ ${page} — помилка завантаження`));
    });
  },

  runScenario: function () {
    if (!this.checkCID()) return;
    const steps = [
      { step: "start", page: "video.html" },
      { step: "quest", page: "quests.html" },
      { step: "feedback", page: "support.html" }
    ];
    steps.forEach(s => {
      this.log(`🎮 Крок: ${s.step} → ${s.page}`);
    });
    alert("🎬 Сценарій гри активовано.");
  },

  lockFile: function (filename) {
    if (!this.checkCID()) return;
    this.log(`🔐 Файл заблоковано: ${filename}`);
    alert(`🛡️ ${filename} тепер захищений від змін.`);
  },

  suggestCleanup: function () {
    const used = 6.14; // ГБ — приклад
    const total = 15;
    const percent = ((used / total) * 100).toFixed(1);
    this.log(`💾 Використано ${used} ГБ з ${total} ГБ (${percent}%)`);
    if (percent > 80) {
      alert("⚠️ Пам’ять заповнена. Рекомендується видалити непотрібні файли.");
      this.log("⚠️ Рекомендовано очищення пам’яті");
    } else {
      this.log("✅ Пам’яті достатньо");
    }
  },

  syncFromCloud: function () {
    if (!this.checkCID()) return;
    this.log("☁️ Запуск синхронізації з хмари...");
    if (typeof cloudSync !== "undefined") {
      cloudSync.syncAll();
    } else {
      this.log("❌ cloudSync.js не підключено");
    }
  }
};

// Автоматичний запуск при вході
window.addEventListener("load", () => {
  directorBot.scanPages();
  directorBot.suggestCleanup();
});
