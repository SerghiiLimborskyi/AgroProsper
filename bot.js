const locales = {
  ua: require('./locales/uk.json'),
  pl: require('./locales/pl.json'),
  en: require('./locales/en.json')
};

const lang = ctx.from.language_code?.substring(0, 2) || 'ua';
const t = locales[lang] || locales['ua'];

bot.sendMessage(ctx.chat.id, t.greeting);

import uk from './locales/uk.json';
import pl from './locales/pl.json';
import en from './locales/en.json';

const locales = { ua: uk, pl, en };

function setLanguage(ctx) {
  const code = ctx.from.language_code?.slice(0, 2) || 'ua';
  const lang = ['pl', 'en'].includes(code) ? code : 'ua';
  const dict = locales[lang];
  const t = (key) => key.split('.').reduce((o, k) => (o || {})[k], dict) || key;
  return { lang, t };
}

const { generateCard } = require('@serghiilimborskyi/nft-card-generator');

const svg = generateCard({
  name: "Serhii Limborskyi",
  badge: "Top Farmer",
  joinDate: "2025-06-21",
  tokenId: "#DAO000147"
});

console.log(svg);
