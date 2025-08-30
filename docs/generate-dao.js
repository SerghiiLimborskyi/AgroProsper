const fs = require('fs');
const https = require('https');

// === DAO-СЦЕНА ===
function createDAOVoteScene(proposalId, user) {
  const html = `
  <html>
    <head><title>DAO Голосування</title></head>
    <body style="background:#1A1A1A;color:#00FF66;font-family:monospace;text-align:center;">
      <h2>Голосування DAO</h2>
      <p>Пропозиція: ${proposalId}</p>
      <p>Голос від: ${user}</p>
      <a href="https://serghiilimborskyi.github.io/AgroProsper/dao/${proposalId}.html">Перейти до голосування</a>
    </body>
  </html>`;
  fs.writeFileSync(`docs/dao/${proposalId}.html`, html);
}

// === QR-КОД ===
function generateQR(link, filename) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=300x300`;
  const file = fs.createWriteStream(`docs/qr/${filename}`);
  https.get(url, res => res.pipe(file));
}

// === ВИКЛИК ===
const proposalId = 'proposal-42';
const user = '0xUser123';

createDAOVoteScene(proposalId, user);
generateQR(`https://serghiilimborskyi.github.io/AgroProsper/dao/${proposalId}.html`, `${proposalId}.png`);
