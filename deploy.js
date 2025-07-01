const hre = require("hardhat");

async function main() {
  const supply = process.env.INITIAL_SUPPLY || "1000000";
  const Token = await hre.ethers.getContractFactory("AgroToken");
  const token = await Token.deploy(supply);
  await token.deployed();

  console.log(`✅ AgroToken deployed to ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
window.location.href = './drop.html';
console.log('🤖 Бот активний. Токен: 🔐');
const tokenURI = "ipfs://...";
fetch('/api/token-uri').then(...)
