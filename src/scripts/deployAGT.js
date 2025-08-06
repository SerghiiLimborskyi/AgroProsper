const hre = require("hardhat");

async function main() {
  const AGTToken = await hre.ethers.getContractFactory("AGTToken");
  const token = await AGTToken.deploy();

  await token.deployed();
  console.log(`AGTToken deployed to: ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
