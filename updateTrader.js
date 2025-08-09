import { Web3Storage, File } from 'web3.storage';
import fs from 'fs';

const token = 'YOUR_WEB3STORAGE_TOKEN';
const client = new Web3Storage({ token });

async function updateTrader() {
  const data = JSON.parse(fs.readFileSync('contracts/trader.json', 'utf8'));
  data.description = 'Оновлено для трейдерів';
  fs.writeFileSync('contracts/trader.json', JSON.stringify(data, null, 2));

  const files = [new File([JSON.stringify(data)], 'trader.json')];
  const cid = await client.put(files);
  console.log('✅ trader.json CID:', cid);
}

updateTrader();
