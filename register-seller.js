const express = require('express');
const Airtable = require('airtable');
const router = express.Router();

// 🔐 Airtable конфігурація
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// 📥 POST /api/register-seller
router.post('/register-seller', async (req, res) => {
  const { company, region, product, contact, ref } = req.body;

  if (!company || !region || !product || !contact || !ref) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    await base('Sellers').create([
      {
        fields: {
          company,
          region,
          product,
          contact,
          ref_id: ref,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Помилка Airtable:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при збереженні' });
  }
});

module.exports = router;

const express = require('express');
const Airtable = require('airtable');
const fetch = require('node-fetch');
const router = express.Router();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

router.post('/register-seller', async (req, res) => {
  const { company, region, product, contact, ref } = req.body;

  if (!company || !region || !product || !contact || !ref) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    await base('Sellers').create([
      {
        fields: {
          company,
          region,
          product,
          contact,
          ref_id: ref,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    // 📩 Надіслати сповіщення в Telegram
    const message = `🛒 *Нова реєстрація продавця!*\n\n🏢 *${company}*\n📍 ${region}\n📦 ${product}\n📞 ${contact}\n👤 ref: ${ref}`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Помилка Airtable або Telegram:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при збереженні' });
  }
});

module.exports = router;
