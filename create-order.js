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

router.post('/create-order', async (req, res) => {
  const { product, region, amount, buyer_contact, ref } = req.body;

  if (!product || !region || !amount || !buyer_contact || !ref) {
    return res.status(400).json({ success: false, error: '⛔ Всі поля обовʼязкові' });
  }

  try {
    // Зберегти в Airtable
    await base('Orders').create([
      {
        fields: {
          product,
          region,
          amount,
          buyer_contact,
          ref_id: ref,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    // Надіслати сповіщення в Telegram DAO-групу
    const message = `🛒 *Нове замовлення!*\n\n📦 *${product}*\n📍 ${region}\n📐 ${amount}\n📞 ${buyer_contact}\n👤 ref: ${ref}`;
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
    console.error('❌ Order error:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при збереженні' });
  }
});

module.exports = router;
