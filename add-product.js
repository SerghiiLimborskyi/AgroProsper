const express = require('express');
const Airtable = require('airtable');
const router = express.Router();

// 🔐 Airtable конфігурація
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// 📥 POST /api/add-product
router.post('/add-product', async (req, res) => {
  const { name, region, price, unit, contact, ref } = req.body;

  if (!name || !region || !price || !unit || !contact || !ref) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    await base('Products').create([
      {
        fields: {
          name,
          region,
          price: parseFloat(price),
          unit,
          contact,
          ref_id: ref,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Airtable error:', err);
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
const DAO_GROUP_ID = process.env.TELEGRAM_DAO_GROUP_ID;

router.post('/add-product', async (req, res) => {
  const { name, region, price, unit, contact, ref } = req.body;

  if (!name || !region || !price || !unit || !contact || !ref) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    await base('Products').create([
      {
        fields: {
          name,
          region,
          price: parseFloat(price),
          unit,
          contact,
          ref_id: ref,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    // 📢 Надіслати сповіщення в DAO-групу
    const message = `🆕 *Новий товар у DAO-магазині!*\n\n📦 *${name}*\n📍 ${region}\n💰 ${price} грн / ${unit}\n📞 ${contact}\n👤 ref: ${ref}`;
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
    console.error('❌ Airtable або Telegram error:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при збереженні' });
  }
});

module.exports = router;

