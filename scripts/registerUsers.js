const Web3 = require("web3");
const contractABI = require("./UserRegistryABI.json");
const contractAddress = "0xYourContractAddress";
const web3 = new Web3("https://sepolia.infura.io/v3/YOUR_INFURA_KEY");
const registry = new web3.eth.Contract(contractABI, contractAddress);

const users = [
  {
    name: "Олександр Гринчук",
    role: "Фермер",
    region: "Західна Україна",
    wallet: "0xAbC1234567890DefABC1234567890DefABC12345"
  },
  {
    name: "Ірина Ковальчук",
    role: "Агент DAO",
    region: "Центральна Україна",
    wallet: "0xDef4567890AbC1234567890AbC1234567890AbC1"
  },
  {
    name: "Максим Литвиненко",
    role: "Трейдер",
    region: "Східна Україна",
    wallet: "0x7890AbC1234567890DefABC1234567890AbC1234"
  }
];

async function registerAll() {
  for (const user of users) {
    await registry.methods.registerUser(
      user.name,
      user.role,
      user.region,
      user.wallet
    ).send({ from: user.wallet });
    console.log(`✅ Зареєстровано: ${user.name} як ${user.role}`);
  }
}

registerAll();
 
