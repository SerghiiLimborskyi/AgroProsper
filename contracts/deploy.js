import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deploying contracts with:", deployer.address);

  // Deploy AGT Token
  const AGT = await ethers.getContractFactory("AGTToken");
  const agt = await AGT.deploy(ethers.parseEther("1000000"));
  await agt.waitForDeployment();
  console.log("✅ AGT deployed to:", await agt.getAddress());

  // Deploy AgroNFT
  const NFT = await ethers.getContractFactory("AgroNFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  console.log("✅ AgroNFT deployed to:", await nft.getAddress());

  // Save addresses to contracts.json
  const contracts = {
    AGTToken: await agt.getAddress(),
    AgroNFT: await nft.getAddress()
  };

  fs.writeFileSync("contracts.json", JSON.stringify(contracts, null, 2));
  console.log("📦 Saved to contracts.json");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
