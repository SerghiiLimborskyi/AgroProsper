import { create } from 'ipfs-http-client';
export const ipfs = create({ url: 'https://ipfs.io' });
import { Web3Storage, File } from 'web3.storage';

const token = 'YOUR_WEB3STORAGE_API_TOKEN';
const client = new Web3Storage({ token });

export async function uploadMetadata(metadata) {
  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const file = new File([blob], 'metadata.json');
  const cid = await client.put([file]);
  return `https://ipfs.io/ipfs/${cid}/metadata.json`;
}
