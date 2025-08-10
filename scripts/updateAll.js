const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();
const fs = require('fs');
const hre = require('hardhat');

const filesToUpdate = [
  { name: 'starter', path: 'scripts/starter.json' },
  { name: 'farmer', path: 'scripts/farmer.json' },
  { name: 'trader', path: 'scripts/trader.json' }
];

async function uploadAndUpdate(name, path, client, contract) {
  const data = fs.readFileSync(path);
  const files = [new File([data], `${name}.json`)];
  const cid = await client.put(files);
  console.log(`✅ CID for ${name}.json:`, cid);

  const tx = await contract.setBadgeURI(name, `ipfs://${cid}`);
  await tx.wait();
  console.log(`🔗 Smart contract updated for ${name}`);
}

async function main() {
  const token = process.env.WEB3STORAGE_TOKEN;
  const client = new Web3Storage({ token });
  const contract = await hre.ethers.getContract('UserBadgeNFT');

  for (const file of filesToUpdate) {
    await uploadAndUpdate(file.name, file.path, client, contract);
  }

  console.log('🎉 All CIDs updated successfully!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
