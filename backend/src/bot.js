import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';

const bot = new TelegramBot(token);
bot.sendVideo(chatId, fs.createReadStream('src/slides.mp4'))
  .then(() => console.log('📤 Відео надіслано через Telegram'))
  .catch(err => console.error('❌ Помилка надсилання:', err));
