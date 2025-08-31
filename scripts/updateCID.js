import fs from 'fs';
import path from 'path';
import { create } from 'ipfs-http-client';
import { ethers } from 'hardhat';
import dotenv from 'dotenv';
dotenv.config();

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

async function main() {
  const badgeName = process.argv[2] || 'starter'; // можна передавати як аргумент
  const filePath = path.join('metadata', `${badgeName}.json`);

  // 1. Читаємо файл
  const metadata = fs.readFileSync(filePath);
  const parsed = JSON.parse(metadata);
  parsed.description = 'Оновлено через локальний IPFS';
  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));

  // 2. Завантажуємо на IPFS
  const result = await ipfs.add({ content: Buffer.from(JSON.stringify(parsed)) });
  const cid = result.cid.toString();
  const ipfsURI = `ipfs://${cid}`;
  console.log(`✅ CID: ${cid}`);

  // 3. Підключаємо контракт
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt('UserBadgeNFT', process.env.CONTRACT_ADDRESS);

  // 4. Оновлюємо CID у смарт-контракті
  const tx = await contract.updateCID(ipfsURI);
  await tx.wait();
  console.log(`🔗 CID оновлено в контракті: ${ipfsURI}`);
}

main().catch(err => {
  console.error('💥 Помилка:', err.message);
  process.exit(1);
});
