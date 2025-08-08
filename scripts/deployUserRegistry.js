const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("📤 Deploying contracts with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", ethers.utils.formatEther(balance));

  // Заміни на назву свого контракту
  const Token = await ethers.getContractFactory("AgroToken");
  const token = await Token.deploy();
  await token.deployed();

  console.log("✅ Token deployed to:", token.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
