// scripts/lang-utils.js
export async function setLanguage(langCode) {
  const supported = ['ua', 'pl', 'en'];
  const lang = supported.includes(langCode) ? langCode : detectLanguage();
  localStorage.setItem('lang', lang);

  // Завантажити відповідний словник
  const res = await fetch(`locales/${lang}.json`);
  const dict = await res.json();
  return { lang, t: (key) => getNestedKey(dict, key) };
}

function detectLanguage() {
  const browserLang = navigator.language?.slice(0, 2) || 'ua';
  return ['pl', 'en'].includes(browserLang) ? browserLang : 'ua';
}

function getNestedKey(obj, path) {
  return path.split('.').reduce((o, k) => (o || {})[k], obj) || path;
}
