const Web3 = require("web3");
const contractABI = require("./UserRegistryABI.json");

// 🔐 Вкажи реальну адресу контракту
const contractAddress = "0xYourContractAddress";

// 🔐 Вкажи свій приватний ключ (НЕ зберігай у репозиторії!)
const PRIVATE_KEY = "0xYOUR_PRIVATE_KEY";

// 🔗 Підключення до мережі
const web3 = new Web3("https://sepolia.infura.io/v3/YOUR_INFURA_KEY");

// 👤 Імпортуємо обліковий запис
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

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
    try {
      await registry.methods
        .registerUser(user.name, user.role, user.region, user.wallet)
        .send({ from: account.address, gas: 300000 });

      console.log(`✅ Зареєстровано: ${user.name} як ${user.role}`);
    } catch (error) {
      console.error(`❌ Помилка для ${user.name}: ${error.message}`);
    }
  }
}

registerAll();
