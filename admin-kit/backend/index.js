require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

app.post('/api/secure-endpoint', (req, res) => {
  const token = req.headers['authorization'];
  if (token !== `Bearer ${process.env.BOT_SECRET_KEY}`) {
    return res.status(403).json({ error: '❌ Невірний токен' });
  }
  res.json({ message: '✅ Авторизовано!' });
});

app.post('/api/admin/gen-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.json({ token, created: new Date() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔒 Backend OK на порту ${PORT}`);
});
