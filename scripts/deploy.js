const hre = require("hardhat");

async function main() {
  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  const registry = await UserRegistry.deploy();

  await registry.deployed();
  console.log("✅ UserRegistry deployed to:", registry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
