const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 🔐 Конфігурація
const TON_API_KEY = process.env.TON_API_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const NFT_METADATA_URI = process.env.NFT_METADATA_URI; // ipfs://.../metadata-inline.json

router.post('/mint-reward', async (req, res) => {
  const { wallet } = req.body;

  if (!wallet || !wallet.startsWith('EQ')) {
    return res.status(400).json({ success: false, error: '⛔ Некоректна адреса TON-гаманця' });
  }

  try {
    // 🔁 Виклик TonAPI або власного смарт-контракту
    const mintTx = await fetch('https://tonapi.io/v2/nft/mint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TON_API_KEY}`,
        'Content-Type': 'application/json'
      },
      const { logMint } = require('./log-mint');
await logMint({ wallet, game: 'DAO of Crops', reward: 'Top Farmer NFT' });

      body: JSON.stringify({
        to: wallet,
        contract: NFT_CONTRACT_ADDRESS,
        metadata_uri: NFT_METADATA_URI
      })
    });

    const result = await mintTx.json();

    if (result.success || result.tx_hash) {
      return res.json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: '🚨 Мінтинг не вдався' });
    }
  } catch (err) {
    console.error('❌ Mint error:', err);
    res.status(500).json({ success: false, error: '🚨 Помилка при мінтуванні' });
  }
});

module.exports = router;
