async function switchLang(lang) {
  const res = await fetch(`locales/${lang}.json`);
  const data = await res.json();

  for (const key in data) {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    if (el) el.textContent = data[key];
  }

  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "uk";
  switchLang(saved);
});
async function switchLang(lang) {
  const res = await fetch(`locales/${lang}.json`);
  const data = await res.json();

  for (const key in data) {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    if (el) el.textContent = data[key];
  }

  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "uk";
  switchLang(saved);
});
е4
