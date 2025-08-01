// feedback.js

const contractAddress = "0xYourContractAddress";
const abi = [ /* ABI з подією FeedbackSubmitted */ ];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);

contract.on("FeedbackSubmitted", (user, message, timestamp) => {
    console.log("Новий фідбек:", user, message, new Date(timestamp * 1000));
    // Оновити DOM або викликати функцію оновлення інтерфейсу
    addFeedbackToUI(user, message, timestamp);
});

function addFeedbackToUI(user, message, timestamp) {
    const container = document.getElementById("feedback-list");
    const entry = document.createElement("div");
    entry.innerHTML = `<strong>${user}</strong>: ${message} <em>${new Date(timestamp * 1000).toLocaleString()}</em>`;
    container.prepend(entry);
}

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "message", "type": "string" },
      { "internalType": "uint8", "name": "rating", "type": "uint8" }
    ],
    "name": "submitFeedback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }],
    "name": "getFeedback",
    "outputs": [
      { "internalType": "address", "name": "sender", "type": "address" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "message", "type": "string" },
      { "internalType": "uint8", "name": "rating", "type": "uint8" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalFeedbacks",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "uint8", "name": "rating", "type": "uint8" }
    ],
    "name": "FeedbackSubmitted",
    "type": "event"
  }
];
// feedback.js

const contractAddress = "0xYourContractAddress"; // заміни на реальну адресу
const contractABI = [ /* ABI з Solidity-контракту */ ];

async function submitFeedback() {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const rating = parseInt(document.getElementById("rating").value);

    if (!name || !message || rating < 1 || rating > 5) {
        alert("Будь ласка, заповніть всі поля коректно.");
        return;
    }

    if (typeof window.ethereum === "undefined") {
        alert("Будь ласка, встановіть MetaMask.");
        return;
    }

    try {
        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.submitFeedback(name, message, rating);
        document.getElementById("status").innerText = "Відправка...";
        await tx.wait();

        document.getElementById("status").innerText = "✅ Відгук успішно збережено!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "❌ Помилка: " + error.message;
    }
}
