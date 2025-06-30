const express = require('express');
const fs = require('fs');
const app = express();
const port = 3002;

app.get('/ref', (req, res) => {
  const ref = req.query.ref || 'unknown';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = req.headers['user-agent'];
  const time = new Date().toISOString();

  const log = `${time},${ref},${ip},"${ua}"\n`;
  fs.appendFileSync('referrals.csv', log);

  // Перенаправлення на біржу
  res.redirect(`https://openagromarket.com/?ref=${ref}`);
});

app.listen(port, () => {
  console.log(`🔗 Referral logger працює на http://localhost:${port}/ref`);
});

https://your-domain.com/ref?ref=123456

const express = require('express');
const Airtable = require('airtable');
const app = express();
const port = 3002;

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

app.get('/ref', async (req, res) => {
  const ref = req.query.ref || 'unknown';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = req.headers['user-agent'];
  const time = new Date().toISOString();

  try {
    await base('Referrals').create([
      {
        fields: {
          ref_id: ref,
          ip_address: ip,
          user_agent: ua,
          timestamp: time
        }
      }
    ]);
    res.redirect(`https://openagromarket.com/?ref=${ref}`);
  } catch (err) {
    console.error('❌ Airtable error:', err);
    res.status(500).send('Error logging referral');
  }
});

app.listen(port, () => {
  console.log(`🔗 Referral logger працює на http://localhost:${port}/ref`);
});

// Псевдо-код
SELECT COUNT(*) FROM Referrals WHERE ref_id = '123456'
