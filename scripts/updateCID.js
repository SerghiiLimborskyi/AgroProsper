import { sendLog } from './utils/sendLog.js';
import fs from 'fs';
import path from 'path';
import { create } from 'ipfs-http-client';
import { ethers } from 'hardhat';
import dotenv from 'dotenv';
dotenv.config();

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
const METADATA_DIR = 'metadata';
const LOG_FILE = 'tx-log.json';

async function uploadToIPFS(filePath) {
  const metadata = fs.readFileSync(filePath);
  const parsed = JSON.parse(metadata);
  parsed.description = 'Оновлено через updateCID.js';
  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));

  const result = await ipfs.add({ content: Buffer.from(JSON.stringify(parsed)) });
  return `ipfs://${result.cid.toString()}`;
}

async function updateBadgeCID(badgeName, contract) {
  const filePath = path.join(METADATA_DIR, `${badgeName}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Пропущено: ${badgeName} — файл не знайдено`);
    return;
  }

  const ipfsURI = await uploadToIPFS(filePath);
  const tx = await contract.updateCID(ipfsURI);
  const receipt = await tx.wait();

  console.log(`✅ ${badgeName}: CID оновлено → ${ipfsURI}`);
  sendLog(`🧪 CID оновлено для *${badgeName}*\n🔗 ${cid}\n📦 TX: ${txHash}`);
  logTransaction(badgeName, ipfsURI, receipt.transactionHash);
}

function logTransaction(badgeName, cid, txHash) {
  const log = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE)) : {};
  log[badgeName] = { cid, txHash, timestamp: new Date().toISOString() };
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

async function main() {
  const badgeArg = process.argv[2]; // можна передати один бейдж
  const badgeList = badgeArg ? [badgeArg] : fs.readdirSync(METADATA_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.basename(f, '.json'));

  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt('UserBadgeNFT', process.env.CONTRACT_ADDRESS);

  for (const badgeName of badgeList) {
    try {
      await updateBadgeCID(badgeName, contract);
    } catch (err) {
      console.error(`💥 Помилка з ${badgeName}:`, err.message);
    }
  }
}

main();
