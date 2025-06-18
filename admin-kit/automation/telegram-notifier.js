const axios = require('axios');
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function notifySecurityAlert(file, line) {
  const message = `⚠️ Token detected in ${file}\n🔐 Line: ${line}`;
  axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message
  });
}
node admin-kit/automation/telegram-notifier.js
