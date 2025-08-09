const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

// 🔍 Додано: запуск перевірки посилань
async function runLinkCheck() {
  const checkLinks = require("./checkLinks");
  await checkLinks.run();
}

async function main() {
  console.log("🔍 Перевірка посилань перед деплойментом...");
  await runLinkCheck();

  console.log("🚀 Деплой UserRegistry...");
  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.deployed();

  console.log("🚀 Деплой AgroToken...");
  const AgroToken = await hre.ethers.getContractFactory("AgroToken");
  const agroToken = await AgroToken.deploy();
  await agroToken.deployed();

  const addresses = {
    UserRegistry: userRegistry.address,
    AgroToken: agroToken.address,
  };

  fs.writeFileSync("contractAddress.json", JSON.stringify(addresses, null, 2));
  console.log("✅ Контракти задеплоєно:", addresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
