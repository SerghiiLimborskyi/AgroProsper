const hre = require("hardhat");

async function main() {
  console.log("🚀 Починаємо деплоймент...");

  // 1. Деплой UserRegistry
  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.deployed();
  console.log(`✅ UserRegistry задеплойний за адресою: ${userRegistry.address}`);

  // 2. Деплой AGT Token
  const AGT = await hre.ethers.getContractFactory("AGT");
  const agt = await AGT.deploy("AgroToken", "AGT", 1000000);
  await agt.deployed();
  console.log(`✅ AGT Token задеплойний за адресою: ${agt.address}`);

  // 3. (Опціонально) Зберегти адреси в файл
  const fs = require("fs");
  const data = {
    userRegistry: userRegistry.address,
    agtToken: agt.address,
  };
  fs.writeFileSync("contractAddress.json", JSON.stringify(data, null, 2));
  console.log("📦 Адреси збережено в contractAddress.json");
}

main().catch((error) => {
  console.error("❌ Помилка деплойменту:", error);
  process.exitCode = 1;
});
