const DAO_LANGUAGES = {
  "uk": "locales/uk.json",
  "pl": "locales/pl.json",
  "en": "locales/en.json"
};

function daoSetLang(langCode) {
  const langPath = DAO_LANGUAGES[langCode];
  if (!langPath) return;

  fetch(langPath)
    .then(res => res.json())
    .then(dict => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
      });
    });
}
