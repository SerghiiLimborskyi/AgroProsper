const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

async function logAuth({ telegramId, name, username }) {
  try {
    await base('AuthLog').create([
      {
        fields: {
          TelegramID: telegramId,
          Name: name,
          Username: username || '',
          Timestamp: new Date().toISOString()
        }
      }
    ]);
    console.log('✅ Вхід записано в Airtable');
  } catch (err) {
    console.error('❌ Помилка логування входу:', err);
  }
}

module.exports = { logAuth };
