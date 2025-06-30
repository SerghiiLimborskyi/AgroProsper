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
