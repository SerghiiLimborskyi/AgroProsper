import { Web3Storage, File } from 'web3.storage';
import fs from 'fs';
import dotenv from 'dotenv';
import { ethers } from 'hardhat';

dotenv.config();

const token = process.env.WEB3STORAGE_TOKEN;
const client = new Web3Storage({ token });

async function main() {
  // 1. Оновлюємо starter.json
  const data = JSON.parse(fs.readFileSync('contracts/starter.json', 'utf8'));
  data.description = 'Оновлено через Hardhat';
  fs.writeFileSync('contracts/starter.json', JSON.stringify(data, null, 2));

  // 2. Завантажуємо на Web3.Storage
  const files = [new File([JSON.stringify(data)], 'starter.json')];
  const cid = await client.put(files);
  console.log('✅ CID:', cid);

  // 3. Підключаємо контракт
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt('UserBadgeNFT', '0xYourContractAddress');

  // 4. Оновлюємо CID у смарт-контракті
  const tx = await contract.updateCID(`ipfs://${cid}`);
  await tx.wait();
  console.log('✅ CID оновлено в контракті');
}

main().catch(console.error);
