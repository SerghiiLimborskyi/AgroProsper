import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const CONTRACT_ADDRESS = "0x..."; // твоя адреса контракту
const ABI = [ /* ABI з UserBadgeNFT.sol */ ];

export async function mintBadgeSelf(roleIndex) {
  if (!window.ethereum) {
    alert("🦊 Потрібен MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  try {
    const tx = await contract.mintBadgeSelf(roleIndex); // 0 = Starter, 1 = Farmer, 2 = Trader
    await tx.wait();
    alert("🏅 NFT-бейдж успішно видано!");
  } catch (err) {
    console.error("❌ Помилка:", err);
    alert("Не вдалося видати бейдж");
  }
}
