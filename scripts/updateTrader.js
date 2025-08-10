const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();
const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const token = process.env.WEB3STORAGE_TOKEN;
  const client = new Web3Storage({ token });

  const traderData = fs.readFileSync('scripts/trader.json');
  const files = [new File(['' + traderData], 'trader.json')];
  const cid = await client.put(files);

  console.log('✅ CID for trader.json:', cid);

  const contract = await hre.ethers.getContract('UserBadgeNFT');
  const tx = await contract.updateCID('trader', cid);
  await tx.wait();

  console.log('📦 CID updated in smart contract for trader');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
