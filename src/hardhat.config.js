require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: ["0xYourPrivateKey"] // ← заміни на приватний ключ (НЕ публікуй його!)
    }
  }
};
