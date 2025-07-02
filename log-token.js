const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

async function logScan({ tokensFound, filesScanned }) {
  try {
    await base('TokenLog').create([
      {
        fields: {
          'Date': new Date().toISOString(),
          'Tokens Found': tokensFound,
          'Files Scanned': filesScanned
        }
      }
    ]);
    console.log('✅ Лог записано в Airtable');
  } catch (err) {
    console.error('❌ Помилка логування:', err);
  }
}
