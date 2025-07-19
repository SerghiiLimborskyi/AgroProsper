// 🌍 DAO Мультимовність
const DAO_LANGUAGES = {
  "uk": "locales/uk.json",
  "pl": "locales/pl.json",
  "en": "locales/en.json"
};

function daoSetLang(langCode) {
  fetch(DAO_LANGUAGES[langCode])
    .then(res => res.json())
    .then(dict => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
      });
      localStorage.setItem("daoLang", langCode);
    });
}

const savedLang = localStorage.getItem("daoLang") || "uk";
daoSetLang(savedLang);

// 🎼 DAO Музика
const audio = new Audio("assets/promo.mp3");
audio.loop = true;
audio.volume = 0.3;

window.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("music-toggle");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        musicBtn.textContent = "🔊";
      } else {
        audio.pause();
        musicBtn.textContent = "🔈";
      }
    });
  }

  // 🌗 DAO Тема
  const themeBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const theme = localStorage.getItem("daoTheme") || "light";
  html.dataset.theme = theme;

  if (themeBtn) {
    themeBtn.textContent = theme === "dark" ? "🌙" : "🌞";
    themeBtn.addEventListener("click", () => {
      const newTheme = html.dataset.theme === "light" ? "dark" : "light";
      html.dataset.theme = newTheme;
      themeBtn.textContent = newTheme === "dark" ? "🌙" : "🌞";
      localStorage.setItem("daoTheme", newTheme);
    });
  }
});
