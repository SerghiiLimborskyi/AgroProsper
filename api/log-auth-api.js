const express = require('express');
const router = express.Router();
const { logAuth } = require('./log-auth');

router.post('/log-auth', loginLimiter, async (req, res) => {
  const { telegramId, name, username } = req.body;
  if (!telegramId || !name) return res.status(400).json({ error: '⛔ Недостатньо даних' });
  await logAuth({ telegramId, name, username });
  res.json({ success: true });
});

module.exports = router;

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 10, // максимум 10 запитів
  message: '🔒 Занадто багато спроб входу. Спробуйте пізніше.'
});

// Застосувати до маршруту входу
app.post('/login', loginLimiter, (req, res) => {
  // логіка входу
});
