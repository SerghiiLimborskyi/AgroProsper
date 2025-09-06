const directorBot = {
  approvedCID: ["0xAGRO-7F3A", "0xAGRO-9C88"],
  document.getElementById("botLog").innerHTML += `✅ Сценарій запущено<br>`;

  scanPages: function () {
    const pages = [
      "index.html", "about.html", "video.html", "dashboard.html",
      "badges.html", "contact.html", "support.html", "quests.html",
      "slide2.html", "slide3.html", "slide4.html", "slide5.html"
    ];
    pages.forEach(page => {
      fetch(page)
        .then(res => {
          if (!res.ok) console.warn(`❌ ${page} — не знайдено`);
            if (!this.checkCID()) return;
          else console.log(`✅ ${page} — доступна`);
        })
        .catch(() => console.error(`⚠️ ${page} — помилка завантаження`));
    });
  },

  checkCID: function () {
    const cid = localStorage.getItem("cid");
    if (!cid) return alert("🔐 CID не знайдено. Увійдіть через DAO-панель.");
    if (!this.approvedCID.includes(cid)) {
      alert("⛔ CID не має прав Бізнес-Партнера.");
      return false;
    }
    console.log(`✅ CID підтверджено: ${cid}`);
    return true;
  },

  updatePage: function (target) {
    if (!this.checkCID()) return;
    console.log(`🔄 Оновлення дозволено для: ${target}`);
    // Тут можна викликати функцію оновлення або вставки контенту
    alert(`✅ ${target} оновлено згідно з погодженням.`);
  },

  lockFile: function (filename) {
    if (!this.checkCID()) return;
    console.log(`🔐 Файл заблоковано: ${filename}`);
    alert(`🛡️ ${filename} тепер захищений від змін.`);
  },

  suggestCleanup: function () {
    const used = 6.14; // ГБ — приклад
    const total = 15;
    const percent = ((used / total) * 100).toFixed(1);
    console.log(`💾 Використано ${used} ГБ з ${total} ГБ (${percent}%)`);
    if (percent > 80) {
      alert("⚠️ Пам’ять заповнена. Рекомендується видалити непотрібні файли.");
    } else {
      console.log("✅ Пам’яті достатньо.");
    }
  },

  runScenario: function () {
    if (!this.checkCID()) return;
    const steps = [
      { step: "start", page: "video.html" },
      { step: "quest", page: "quests.html" },
      { step: "feedback", page: "support.html" }
    ];
    steps.forEach(s => {
      console.log(`🎮 Крок: ${s.step} → ${s.page}`);
      // Можна автоматично активувати сторінку або вставити контент
    });
    alert("🎬 Сценарій гри активовано.");
  }
};
directorBot.syncFromCloud = function () {
  cloudSync.syncAll();
};
// Автоматичний запуск при вході
window.addEventListener("load", () => {
  directorBot.scanPages();
  directorBot.suggestCleanup();
});
