const express = require('express');
const router = express.Router();
const { logAuth } = require('./log-auth');

router.post('/log-auth', async (req, res) => {
  const { telegramId, name, username } = req.body;
  if (!telegramId || !name) return res.status(400).json({ error: '⛔ Недостатньо даних' });

  await logAuth({ telegramId, name, username });
  res.json({ success: true });
});

module.exports = router;
