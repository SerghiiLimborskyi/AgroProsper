const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

async function logMint({ wallet, game, reward }) {
  try {
    await base('MintLog').create([
      {
        fields: {
          Wallet: wallet,
          Game: game,
          Reward: reward,
          Timestamp: new Date().toISOString()
        }
      }
    ]);
    console.log('✅ Мінтинг записано в Airtable');
  } catch (err) {
    console.error('❌ Помилка логування мінту:', err);
  }
}

module.exports = { logMint };
