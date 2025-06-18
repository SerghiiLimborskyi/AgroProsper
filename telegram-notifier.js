require('dotenv').config({ path: './config/telegram.env' });
const fetch = require('node-fetch');

const message = process.argv.slice(2).join(' ') || '🔔 Сигнал від AgroProsper';
const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: message
  })
})
  .then(res => res.json())
  .then(data => console.log('✅ Повідомлення надіслано:', data))
  .catch(err => console.error('❌ Помилка:', err));
