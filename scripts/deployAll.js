const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Починаємо деплоймент...");

  // Деплой UserRegistry
  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.deployed();
  console.log(`✅ UserRegistry задеплоєно за адресою: ${userRegistry.address}`);

  // Деплой AgroToken
  const AgroToken = await hre.ethers.getContractFactory("AgroToken");
  const agt = await AgroToken.deploy();
  await agt.deployed();
  console.log(`✅ AgroToken задеплоєно за адресою: ${agt.address}`);

  // Збереження адрес у contractAddress.json
  const data = {
    userRegistry: userRegistry.address,
    agtToken: agt.address
  };

  const filePath = path.join(__dirname, "..", "contractAddress.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("📦 Адреси збережено в contractAddress.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Помилка під час деплойменту:", error);
    process.exit(1);
  });
