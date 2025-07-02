const { verifyTelegramUser } = require('./verify-user');

app.get('/api/secure-data', (req, res) => {
  const initData = req.query.initData;
  const isValid = verifyTelegramUser(initData, process.env.BOT_TOKEN);

  if (!isValid) {
    return res.status(403).json({ error: '⛔ Невірна авторизація Telegram' });
  }

  // ✅ Доступ дозволено
  res.json({ message: '🔐 Авторизовано через Telegram WebApp' });
});
