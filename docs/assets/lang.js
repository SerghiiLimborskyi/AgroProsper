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

document.addEventListener("DOMContentLoaded", detectLang);
