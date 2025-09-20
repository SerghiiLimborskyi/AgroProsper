const directorBot = {
  approvedCID: ["0xAGRO-7F3A", "0xAGRO-9C88"],
  protectedFiles: ["runtime-card.json", "mint-api.js", "directorProtocol.md"],

  log(message) {
    const logBox = document.getElementById("botLog");
    if (logBox) {
      logBox.innerHTML += `${message}<br>`;
    } else {
      console.warn("⚠️ botLog не знайдено");
    }
  },

  updateStatus(text) {
    const statusBox = document.getElementById("botStatus");
    if (statusBox) statusBox.textContent = text;
  },

  checkCID() {
    const cid = localStorage.getItem("cid");
    if (!cid) {
      alert("🔐 CID не знайдено. Увійдіть через DAO-панель.");
      this.log("⛔ CID не знайдено");
      this.updateStatus("⛔ Немає CID");
      return false;
    }
    if (cid.startsWith("0xGUEST")) {
      alert("⛔ Доступ лише для агентів DAO. Зареєструйтесь.");
      this.updateStatus("⛔ Гість");
      return false;
    }
    if (!this.approvedCID.includes(cid)) {
      alert("⛔ CID не має прав Бізнес-Партнера.");
      this.log(`⛔ CID не авторизовано: ${cid}`);
      this.updateStatus("⛔ CID не підтверджено");
      return false;
    }
    this.log(`✅ CID підтверджено: ${cid}`);
    this.updateStatus(`✅ CID активний: ${cid}`);
    return true;
  },

  scanPages() {
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

  runScenario() {
    if (!this.checkCID()) return;
    const confirmRun = confirm("🗳️ Підтвердити запуск DAO-сценарію?");
    if (!confirmRun) {
      this.log("⛔ Сценарій скасовано користувачем");
      return;
    }
    const steps = [
      { step: "start", page: "video.html" },
      { step: "quest", page: "quests.html" },
      { step: "feedback", page: "support.html" }
    ];
    steps.forEach(s => this.log(`🎮 Крок: ${s.step} → ${s.page}`));
    alert("🎬 Сценарій гри активовано.");
  },

  lockFile(filename) {
    if (!this.checkCID()) return;
    if (!this.protectedFiles.includes(filename)) {
      this.log(`⚠️ ${filename} не входить до списку захищених`);
      return;
    }
    this.log(`🔐 Файл заблоковано: ${filename}`);
    alert(`🛡️ ${filename} тепер захищений від змін.`);
  },

  suggestCleanup() {
    const used = 6.14; const total = 15;
    const percent = ((used / total) * 100).toFixed(1);
    this.log(`💾 Використано ${used} ГБ з ${total} ГБ (${percent}%)`);
    if (percent > 80) {
      alert("⚠️ Пам’ять заповнена. Рекомендується очищення.");
      this.log("⚠️ Рекомендовано очищення пам’яті");
      this.mintBadge("MemoryCleaner");
    } else {
      this.log("✅ Пам’яті достатньо");
    }
  },

  mintBadge(type) {
    this.log(`🏅 Видача NFT-бейджа: ${type}`);
    alert(`🎉 Ви отримали бейдж: ${type}`);
  },

  syncFromCloud() {
    if (!this.checkCID()) return;
    this.log("☁️ Запуск синхронізації з хмари...");
    if (typeof cloudSync !== "undefined") {
      cloudSync.syncAll();
    } else {
      this.log("❌ cloudSync.js не підключено");
    }
  }
};

// Автозапуск
window.addEventListener("load", () => {
  directorBot.scanPages();
  directorBot.suggestCleanup();
});
