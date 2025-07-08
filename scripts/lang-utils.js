export async function setLanguage(inputCode) {
  const supported = ['ua', 'pl', 'en'];

  // Визначити мову
  let lang = inputCode || localStorage.getItem('lang') || detectLanguage();
  if (!supported.includes(lang)) lang = 'ua';

  // Зберегти вибір
  localStorage.setItem('lang', lang);

  // Завантажити словник
  const res = await fetch(`locales/${lang}.json`);
  const dict = await res.json();

  // Функція доступу до фраз
  const t = (key) => key.split('.').reduce((o, k) => (o || {})[k], dict) || key;

  return { lang, t };
}

function detectLanguage() {
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  return ['pl', 'en'].includes(browserLang) ? browserLang : 'ua';
}
