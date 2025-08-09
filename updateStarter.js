import { Web3Storage, File } from 'web3.storage';
import fs from 'fs';

const token = 'YOUR_WEB3STORAGE_TOKEN';
const client = new Web3Storage({ token });

async function updateStarter() {
  const data = JSON.parse(fs.readFileSync('starter.json', 'utf8'));
  data.description = 'Оновлений опис після голосування';
  fs.writeFileSync('starter.json', JSON.stringify(data, null, 2));

  const files = [new File(['' + JSON.stringify(data)], 'starter.json')];
  const cid = await client.put(files);
  console.log('✅ Новий CID:', cid);
}

updateStarter();
