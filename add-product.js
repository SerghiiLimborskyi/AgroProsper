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
