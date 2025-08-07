// server.js
import express from 'express';
const app = express();
app.use(express.json());

app.post('/api/register', (req, res) => {
  const { name, email, account } = req.body;
  console.log('Новий користувач:', { name, email, account });
  // Тут можна зберегти в базу даних
  res.status(200).json({ message: 'Реєстрація успішна' });
});

app.listen(3001, () => console.log('Сервер запущено на порту 3001'));
