const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();
const fs = require('fs');
const hre = require('hardhat');
const path = require('path');

// 🧩 Файли для оновлення
const filesToUpdate = [
  { name: 'starter', path: 'scripts/starter.json' },
  { name: 'farmer', path: 'scripts/farmer.json' },
  { name: 'trader', path: 'scripts/trader.json' }
];

// 📦 Завантаження на IPFS і оновлення контракту
async function uploadAndUpdate(name, filePath, client, contract) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  try {
    const data = fs.readFileSync(filePath);
    const files = [new File([data], `${name}.json`)];
    console.log(`📤 Uploading ${name}.json to IPFS...`);
    const cid = await client.put(files);
    console.log(`✅ CID for ${name}: ${cid}`);

    console.log(`🔗 Updating smart contract for ${name}...`);
    const tx = await contract.setBadgeURI(name, `ipfs://${cid}`);
    await tx.wait();
    console.log(`🎯 Smart contract updated for ${name}`);
  } catch (err) {
    console.error(`❌ Error processing ${name}:`, err.message);
  }
}

// 🚀 Основна функція
async function main() {
  const token = process.env.WEB3STORAGE_TOKEN;
  if (!token) {
    console.error('❌ Missing WEB3STORAGE_TOKEN in .env');
    process.exit(1);
  }

  const client = new Web3Storage({ token });
  const contract = await hre.ethers.getContract('UserBadgeNFT');

  console.log('🔄 Starting CID update process...');
  for (const file of filesToUpdate) {
    await uploadAndUpdate(file.name, file.path, client, contract);
  }
  console.log('✅ All badge URIs updated successfully!');
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error.message);
  process.exitCode = 1;
});
