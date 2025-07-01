const express = require('express');
const Airtable = require('airtable');
const fetch = require('node-fetch');
const router = express.Router();

// Airtable конфігурація
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// Telegram
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DAO_GROUP_ID = process.env.TELEGRAM_DAO_GROUP_ID;

router.post('/add-tech', async (req, res) => {
  const { title, category, region, description, author } = req.body;

  if (!title || !category || !region || !description || !author) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    // Зберегти в Airtable
    await base('AgroTech').create([
      {
        fields: {
          title,
          category,
          region,
          description,
          author,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    // Надіслати сповіщення в DAO-групу
    const message = `🌿 *Нова агротехнологія!*\n\n🧪 *${title}*\n📂 ${category}\n📍 ${region}\n📝 ${description}\n👤 ${author}`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: DAO_GROUP_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    res.json({ success: true });
  } catch (err) {
    console.error('❌ add-tech error:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при збереженні' });
  }
});

module.exports = router;

const express = require('express');
const Airtable = require('airtable');
const fetch = require('node-fetch');
const router = express.Router();

// Airtable конфігурація
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// Telegram
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DAO_GROUP_ID = process.env.TELEGRAM_DAO_GROUP_ID;

router.post('/add-tech', async (req, res) => {
  const { title, category, region, description, author } = req.body;

  if (!title || !category || !region || !description || !author) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    // Зберегти в Airtable
    await base('AgroTech').create([
      {
        fields: {
          title,
          category,
          region,
          description,
          author,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    // Надіслати сповіщення в DAO-групу
    const message = `🌿 *Нова агротехнологія!*\n\n🧪 *${title}*\n📂 ${category}\n📍 ${region}\n📝 ${description}\n👤 ${author}`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: DAO_GROUP_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    res.json({ success: true });
  } catch (err) {
    console.error('❌ add-tech error:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при збереженні' });
  }
});

const addTech = require('./api/add-tech');
app.use(express.json());
app.use('/api', addTech);

module.exports = router;
