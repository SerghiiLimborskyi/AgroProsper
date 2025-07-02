const fs = require('fs');
const path = require('path');
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ROOT_DIR = './';
const INTERVAL = 60 * 60 * 1000; // 1 година

const tokenRegex = /(?:['"`])?(?:\d{6,}:[\w-]{30,})(?:['"`])?/g;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, i) => {
    if (tokenRegex.test(line)) {
      const message = `⚠️ Token detected in *${filePath}*\n🔐 Line ${i + 1}`;
      axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });
    }
  });
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.html')) {
      scanFile(fullPath);
    }
  });
}

function startWatch() {
  console.log('🛡️ Guardian Watch запущено...');
  walk(ROOT_DIR);
  console.log('✅ Перевірка завершена. Наступна через 1 годину.');
}

startWatch();
setInterval(startWatch, INTERVAL);

const { logScan } = require('./log-token');
logScan({ tokensFound: totalFound, filesScanned: totalFiles });
