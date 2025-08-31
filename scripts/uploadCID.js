import { Web3Storage, File } from 'web3.storage';

const token = 'YOUR_WEB3STORAGE_API_TOKEN';
const client = new Web3Storage({ token });

const cidData = {
  cid: '0xA3F...91',
  farm: 'Зелений луг',
  coordinates: '53.42, 14.55',
  status: 'Активний'
};

async function storeCID() {
  const file = new File([JSON.stringify(cidData)], 'cid-0xA3F91.json', { type: 'application/json' });
  const cid = await client.put([file]);
  console.log('✅ CID uploaded to IPFS:', cid);
}

storeCID();
