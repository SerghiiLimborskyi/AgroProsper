import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new TelegramBot(token);

(async () => {
  try {
    await bot.sendVideo(chatId, fs.createReadStream('src/slides.mp4'));
    console.log('📤 Відео надіслано через Telegram');
  } catch (err) {
    console.error('❌ Помилка надсилання:', err);
  } finally {
    process.exit();
  }
})();
