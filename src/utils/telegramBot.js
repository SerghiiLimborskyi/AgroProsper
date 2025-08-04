// src/utils/telegramBot.js

import axios from "axios";

const TOKEN = "YOUR_BOT_TOKEN"; // 🔐 встав свій токен
const CHAT_ID = "USER_CHAT_ID"; // 🔐 встав ID користувача або групи

export const sendTelegramMessage = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const payload = {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML"
    };

    const response = await axios.post(url, payload);
    console.log("✅ Повідомлення надіслано:", response.data);
  } catch (error) {
    console.error("❌ Помилка надсилання:", error.message);
  }
};
