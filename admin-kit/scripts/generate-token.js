const crypto = require('crypto');
const fs = require('fs');

const token = crypto.randomBytes(32).toString('hex');
fs.writeFileSync('.env', `BOT_SECRET_KEY=${token}\n`, { flag: 'a' });

console.log('✅ BOT_SECRET_KEY створено та записано в .env');
