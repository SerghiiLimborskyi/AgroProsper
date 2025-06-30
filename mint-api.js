require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
const port = 3001;

app.use(cors());

const CONTRACT_ADDRESS = process.env.SBT_CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.MINTER_PRIVATE_KEY;
const TOKEN_URI = 'ipfs://Qm.../top-farmer.json'; // IPFS-метадані

const abi = [
  'function mintSBT(address to, string memory tokenURI) external'
];

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get('/mint-sbt', async (req, res) => {
  const wallet = req.query.wallet;
  const score = parseInt(req.query.score || '0');

  if (!wallet || !ethers.isAddress(wallet)) {
    return res.status(400).json({ success: false, error: 'Invalid wallet address' });
  }

  if (score < 5) {
    return res.status(403).json({ success: false, error: 'Score too low for SBT' });
  }

  try {
    const tx = await contract.mintSBT(wallet, TOKEN_URI);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Minting error:', err);
    res.status(500).json({ success: false, error: 'Minting failed' });
  }
});

app.listen(port, () => {
  console.log(`🎖️ SBT API запущено на http://localhost:${port}`);
});
