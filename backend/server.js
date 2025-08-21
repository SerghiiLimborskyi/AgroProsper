// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// POST /api/register
app.post("/api/register", (req, res) => {
  const { name, email, account, wallet } = req.body;

  if (!name || !email || !wallet) {
    return res.status(400).json({ error: "Обов’язкові поля відсутні" });
  }
  
app.get('/run/full', async (req, res) => {
  try {
    require('./src/generateSlides.js');
    require('./src/renderSlides.js');

    const { exec } = require('child_process');
    exec('bash src/makeVideo.sh', (err, stdout, stderr) => {
      if (err) return res.send(`❌ ffmpeg error: ${stderr}`);
      require('./src/bot.js');
      res.send('✅ Повний цикл завершено: відео створено і надіслано!');
    });
  } catch (e) {
    res.send(`❌ Помилка: ${e.message}`);
  }
});

  console.log("📥 Новий користувач:");
  console.log("Ім’я:", name);
  console.log("Email:", email);
  console.log("Рахунок:", account);
  console.log("Гаманець:", wallet);

  // Тут можна додати збереження в базу даних

  res.status(200).json({ message: "Реєстрація успішна" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});
