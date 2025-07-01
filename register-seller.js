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
