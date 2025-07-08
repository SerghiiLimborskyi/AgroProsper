const locales = {
  ua: require('./locales/uk.json'),
  pl: require('./locales/pl.json'),
  en: require('./locales/en.json')
};

const lang = ctx.from.language_code?.substring(0, 2) || 'ua';
const t = locales[lang] || locales['ua'];

bot.sendMessage(ctx.chat.id, t.greeting);
