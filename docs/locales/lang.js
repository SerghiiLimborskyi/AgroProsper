const langMap = {
  "uk": "locales/uk.json",
  "pl": "locales/pl.json",
  "en": "locales/en.json"
};

function switchLang(code) {
  fetch(langMap[code])
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });
    });
}
