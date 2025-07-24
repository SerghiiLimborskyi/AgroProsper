async function switchLang(lang) {
  const res = await fetch(`locales/${lang}.json`);
  const data = await res.json();

  for (const key in data) {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    if (el) el.textContent = data[key];
  }

  localStorage.setItem("lang", lang);
}

function detectLang() {
  const browserLang = navigator.language.slice(0, 2); // 'uk', 'pl', 'en', etc.
  const supported = ["uk", "pl", "en"];
  const saved = localStorage.getItem("lang");

  if (saved) {
    switchLang(saved);
  } else {
    const lang = supported.includes(browserLang) ? browserLang : "uk";
    switchLang(lang);
  }
}
const translations = {
  uk: {
    changelog_title: "📘 CHANGELOG — DAO Studio 2025",
    changelog_intro: "Переглянь усі оновлення DAO Studio: логотипи, NFT, IPFS, Telegram-команди та CI/CD інтеграцію.",
    changelog_button: "Відкрити CHANGELOG",
    ipfs_download: "📦 Завантажити з IPFS"
  },
  pl: {
    changelog_title: "📘 Zmiany — DAO Studio 2025",
    changelog_intro: "Zobacz wszystkie aktualizacje DAO Studio: logotypy, NFT, IPFS, Telegram i CI/CD.",
    changelog_button: "Otwórz CHANGELOG",
    ipfs_download: "📦 Pobierz z IPFS"
  },
  en: {
    changelog_title: "📘 CHANGELOG — DAO Studio 2025",
    changelog_intro: "View all updates to DAO Studio: logos, NFTs, IPFS, Telegram commands, and CI/CD integration.",
    changelog_button: "Open CHANGELOG",
    ipfs_download: "📦 Download from IPFS"
  }
};

document.addEventListener("DOMContentLoaded", detectLang);
