import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ✅ Реєстрація
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

// ✅ Маршрут для повного циклу
app.get('/run/full', async (req, res) => {
  try {
   // require('./src/generateSlides.js');
   // require('./src/renderSlides.js');

   // exec('bash src/makeVideo.sh', (err, stdout, stderr) => {
      if (err) return res.send(`❌ ffmpeg error: ${stderr}`);
      require('./src/bot.js');
      res.send('✅ Повний цикл завершено: відео створено і надіслано!');
    });
  } catch (e) {
    res.send(`❌ Помилка: ${e.message}`);
  }
});

// ✅ Запуск сервера — має бути поза всіма маршрутами!
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});
