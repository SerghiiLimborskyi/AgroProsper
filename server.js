const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const { name, email, wallet, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Ім’я та email обов’язкові" });
  }

  console.log("📥 Нова реєстрація:");
  console.log({ name, email, wallet, role });

  // Тут можна зберегти в базу даних або надіслати email

  res.status(200).json({ message: "Реєстрація успішна" });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});
