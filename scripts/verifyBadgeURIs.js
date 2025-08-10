const hre = require('hardhat');
const fs = require('fs');
const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();

const badgeFiles = {
  starter: 'scripts/starter.json',
  farmer: 'scripts/farmer.json',
  trader: 'scripts/trader.json'
};

async function getLocalCID(name, path, client) {
  const data = fs.readFileSync(path);
  const files = [new File([data], `${name}.json`)];
  const cid = await client.put(files, { wrapWithDirectory: false });
  return cid;
}

async function main() {
  const contract = await hre.ethers.getContract('UserBadgeNFT');
  const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });

  for (const [name, path] of Object.entries(badgeFiles)) {
    const onChainURI = await contract.badgeURIs(name);
    const onChainCID = onChainURI.replace('ipfs://', '');

    const localCID = await getLocalCID(name, path, client);

    const match = onChainCID === localCID;
    const status = match ? '✅ MATCH' : '❌ MISMATCH';

    console.log(`🔎 ${name}:`);
    console.log(`   📦 On-chain CID:  ${onChainCID}`);
    console.log(`   🗂️ Local CID:     ${localCID}`);
    console.log(`   🔍 Status:        ${status}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
