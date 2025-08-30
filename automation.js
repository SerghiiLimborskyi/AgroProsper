// automation.js

const fs = require('fs');
const https = require('https');
const path = require('path');

// === NFT-БЕЙДЖ ===
function createNFTBadge(user, tokenId) {
  const html = `
  <html>
    <head><title>NFT Бейдж</title></head>
    <body style="background:#111;color:#FFD700;font-family:sans-serif;text-align:center;">
      <h1>AgroProsper NFT</h1>
      <p>Користувач: ${user}</p>
      <p>Token ID: ${tokenId}</p>
      <img src="qr/nft-${tokenId}.png" width="200"/>
    </body>
  </html>`;
  fs.writeFileSync(`docs/nft-badge-${tokenId}.html`, html);
}

// === DAO-СЦЕНА ===
function createDAOVoteScene(proposalId, user) {
  const html = `
  <html>
    <head><title>DAO Голосування</title></head>
    <body style="background:#1A1A1A;color:#00FF66;font-family:monospace;text-align:center;">
      <h2>Голосування DAO</h2>
      <p>Пропозиція: ${proposalId}</p>
      <p>Голос від: ${user}</p>
      <a href="https://serghiilimborskyi.github.io/AgroProsper/vote/${proposalId}">Перейти до голосування</a>
    </body>
  </html>`;
  fs.writeFileSync(`docs/dao-vote-${proposalId}.html`, html);
}

// === QR-КОД ===
function generateQR(link, filename) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=300x300`;
  const file = fs.createWriteStream(`docs/public/qr/${filename}`);
  https.get(url, res => res.pipe(file));
}

// === ВИКЛИК ===
createNFTBadge('0xUser123', 101);
generateQR('https://serghiilimborskyi.github.io/AgroProsper/nft-badge-101.html', 'nft-101.png');

createDAOVoteScene('proposal-42', '0xUser123');
generateQR('https://serghiilimborskyi.github.io/AgroProsper/dao-vote-proposal-42.html', 'dao-42.png');
