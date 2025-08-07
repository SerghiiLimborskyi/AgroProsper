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
