// airtable-logs.js
require('dotenv').config();
const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

/**
 * Логування дії користувача в Airtable
 * @param {Object} logData - Дані для логування
 * @param {string} logData.user_id - Telegram ID
 * @param {string} logData.username - @username або порожньо
 * @param {string} logData.region - Наприклад: UA_KYIV
 * @param {string} logData.action - Наприклад: "Натиснуто 2️⃣ Етика"
 * @param {string} logData.document - Назва PDF або "—"
 */
function logToAirtable({ user_id, username, region, action, document }) {
  base('Access').create({
    timestamp: new Date().toISOString(),
    user_id: String(user_id),
    username: username || '—',
    region: region || '—',
    action: action || '—',
    document_sent: document || '—'
  }, (err) => {
    if (err) {
      console.error('❌ Airtable логування не вдалося:', err);
    } else {
      console.log('✅ Лог записано в Airtable');
    }
  });
}

module.exports = { logToAirtable };
