// scripts/cid/badgeManager.js

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Web3Storage, File } = require('web3.storage');
const { ethers } = require('hardhat');

const BADGES = ['starter', 'farmer', 'trader'];
const METADATA_DIR = './metadata';
const CONTRACT_NAME = 'UserBadgeNFT';

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function getClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function uploadBadge(badge) {
  const filePath = path.join(METADATA_DIR, `${badge}.json`);
  const metadata = fs.readFileSync(filePath);
  const files = [new File([metadata], `${badge}.json`)];
  const cid = await getClient().put(files);
  console.log(`✅ ${badge} uploaded to IPFS: ${cid}`);
  return cid;
}

async function updateContractCID(badge, cid) {
  const contract = await ethers.getContract(CONTRACT_NAME);
  const tx = await contract.updateCID(badge, cid);
  await tx.wait();
  console.log(`🔄 ${badge} CID updated in contract: ${cid}`);
}

async function verifyCID(badge) {
  const contract = await ethers.getContract(CONTRACT_NAME);
  const onChainURI = await contract.badgeURIs(badge);
  const onChainCID = onChainURI.replace('ipfs://', '');
  const localCID = await uploadBadge(badge); // re-upload to get CID
  const match = onChainCID === localCID;
  console.log(match ? `✅ ${badge} CID MATCH` : `❌ ${badge} CID MISMATCH`);
}

async function main() {
  const args = process.argv.slice(2);
  const badgeArg = args.includes('--all') ? BADGES : BADGES.filter(b => args.includes(`--badge=${b}`));

  for (const badge of badgeArg) {
    if (args.includes('--upload')) {
      const cid = await uploadBadge(badge);
      if (args.includes('--update')) {
        await updateContractCID(badge, cid);
      }
    }
    if (args.includes('--verify')) {
      await verifyCID(badge);
    }
  }
}

main().catch(err => {
  console.error('💥 Error:', err);
  process.exit(1);
});
