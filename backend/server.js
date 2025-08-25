import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fetch from "node-fetch"; // Додано для YouTube API

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/**
 * ✅ Реєстрація користувача
 */
app.post("/api/register", (req, res) => {
  const { name, email, account, wallet } = req.body;
  if (!name || !email || !wallet) {
    return res.status(400).json({ error: "Обов’язкові поля відсутні" });
  }

  console.log("📥 Новий користувач:");
  console.log("Ім’я:", name);
  console.log("Email:", email);
  console.log("Рахунок:", account);
  console.log("Гаманець:", wallet);

  res.status(200).json({ message: "Реєстрація успішна" });
});

/**
 * ✅ YouTube API — останні відео з каналу
 */
app.get("/api/videos", async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = "UCsN8AHUPLQp_xJlGOkwZkmw";
    const maxResults = 4;

    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("❌ Помилка при запиті до YouTube API:", error);
    res.status(500).json({ error: "Не вдалося отримати відео" });
  }
});

/**
 * ✅ Повний цикл: генерація відео + надсилання
 */
app.get("/run/full", async (req, res) => {
  try {
    exec("bash src/makeVideo.sh", (err, stdout, stderr) => {
      if (err) return res.send(`❌ ffmpeg error: ${stderr}`);

      require("./src/bot.js");
      res.send("✅ Повний цикл завершено: відео створено і надіслано!");
    });
  } catch (e) {
    res.send(`❌ Помилка: ${e.message}`);
  }
});

/**
 * ✅ Запуск сервера
 */
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});

/**
 * ✅ Обробка неочікуваних помилок
 */
process.on("uncaughtException", err => {
  console.error("Uncaught error:", err);
});
