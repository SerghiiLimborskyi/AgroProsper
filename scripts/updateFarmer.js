const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();
const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const token = process.env.WEB3STORAGE_TOKEN;
  const client = new Web3Storage({ token });

  const farmerData = fs.readFileSync('scripts/farmer.json');
  const files = [new File(['' + farmerData], 'farmer.json')];
  const cid = await client.put(files);

  console.log('✅ CID for farmer.json:', cid);

  const contract = await hre.ethers.getContract('UserBadgeNFT');
  const tx = await contract.updateCID('farmer', cid);
  await tx.wait();

  console.log('🚜 CID updated in smart contract for farmer');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
