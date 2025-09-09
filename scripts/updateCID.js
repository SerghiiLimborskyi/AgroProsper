// updateCID.js — локальне оновлення CID-бейджів без IPFS/Web3

import fs from 'fs';
import path from 'path';

const METADATA_DIR = 'metadata';
const LOG_FILE = 'tx-log.json';

function updateLocalCID(badgeName) {
  const filePath = path.join(METADATA_DIR, `${badgeName}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Пропущено: ${badgeName} — файл не знайдено`);
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(filePath));
  metadata.description = 'Оновлено локально через updateCID.js';
  metadata.updatedAt = new Date().toISOString();

  fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));
  logTransaction(badgeName, metadata);
  console.log(`✅ ${badgeName}: CID оновлено локально`);
}

function logTransaction(badgeName, metadata) {
  const log = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE)) : {};
  log[badgeName] = {
    updatedAt: metadata.updatedAt,
    description: metadata.description
  };
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

// 🔁 Запуск
const badgeArg = process.argv[2];
const badgeList = badgeArg
  ? [badgeArg]
  : fs.readdirSync(METADATA_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => path.basename(f, '.json'));

for (const badgeName of badgeList) {
  updateLocalCID(badgeName);
}
