“Зроби адаптивний throttle”
  const throttleMap = new Map(); // user_id → timestamp

const THROTTLE_MS = 10 * 1000; // 10 секунд

const { logToAirtable } = require('./airtable-logs');

require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);
const ads = JSON.parse(fs.readFileSync('./data/ads.json', 'utf8'));

// 🔍 Визначення регіону (спрощено)
function detectRegion(ctx) {
  const lang = ctx.from.language_code || 'uk';
  const phone = ctx.message?.contact?.phone_number || '';
  if (phone.startsWith('+48')) return 'PL_SZCZECIN';
  if (phone.startsWith('+420')) return 'EU_CZ';
  return 'UA_KYIV';
}

// 🎯 Отримати рекламу
function getAd(region) {
  return ads.find(ad => ad.region === region);
}

// 🧾 Відповідь на /start
bot.start((ctx) => {
  const region = detectRegion(ctx);
  const ad = getAd(region);
  const name = ctx.from.first_name || '👤';

  ctx.reply(`Привіт, ${name}!\nОберіть дію:`, Markup.keyboard([
    ['1️⃣ DAO Маніфест', '2️⃣ Етика', '3️⃣ Ліцензія'],
    ['5️⃣ Продукти у вашому регіоні', '9️⃣ Звʼязатись з координатором']
  ]).resize());

  if (ad) {
    ctx.reply(`${ad.product}\n${ad.cta}`, Markup.inlineKeyboard([
      Markup.button.url('🔗 Перейти', ad.link)
    ]));
  }
});

// 📲 Обробка клавіш
bot.hears(/^[0-9]/, async (ctx) => {
  const key = ctx.message.text.trim();
  const user = ctx.from.username || ctx.from.id;

  switch (key) {
    case '1':
      ctx.replyWithDocument({ source: './docs/manifest.pdf' });
      break;
    case '2':
      ctx.replyWithDocument({ source: './docs/ethics.pdf' });
      break;
    case '3':
      ctx.replyWithDocument({ source: './docs/license.pdf' });
      break;
    case '5':
      const region = detectRegion(ctx);
      const ad = getAd(region);
      if (ad) {
        ctx.reply(`${ad.product}\n${ad.cta}`, Markup.inlineKeyboard([
          Markup.button.url('🔗 Перейти', ad.link)
        ]));
      }
      break;
    case '9':
      ctx.reply('📞 Координатор звʼяжеться з вами найближчим часом.');
      break;
    default:
      ctx.reply('❓ Невідома команда. Спробуйте ще раз.');
  }

  // 🔐 Логування (опційно)
  await axios.post(process.env.LOG_WEBHOOK, {
    user,
    action: `Натиснуто ${key}`,
    timestamp: new Date().toISOString()
  }).catch(() => {});
});

bot.launch();

const { logToAirtable } = require('./airtable-logs');

logToAirtable({
  user_id: ctx.from.id,
  username: ctx.from.username,
  region: detectRegion(ctx),
  action: 'Натиснуто 3️⃣ Ліцензія',
  document: 'license.pdf'
});

npm install airtable
