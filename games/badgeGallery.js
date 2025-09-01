document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("badgeGallery");

  fetch("/data/badges.json")
    .then(res => res.json())
    .then(badges => {
      if (!badges.length) {
        gallery.innerHTML = "<p>😢 У вас ще немає бейджів</p>";
        return;
      }

      badges.forEach(badge => {
        const card = document.createElement("div");
        card.className = "badge-card";
        card.innerHTML = `
          <img src="/assets/${badge.image}" alt="${badge.title}" width="100">
          <h3>${badge.title}</h3>
          <p>${new Date(badge.timestamp).toLocaleString()}</p>
        `;
        gallery.appendChild(card);
       import { checkQuestProgress } from "./questEngine.js";
// після завантаження бейджів:
checkQuestProgress(badges); 
      });
    })
    .catch(err => {
      gallery.innerHTML = `<p>❌ Помилка: ${err.message}</p>`;
    });
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const CONTRACT_ADDRESS = "0x..."; // твоя адреса
const ABI = [ /* ABI з UserBadgeNFT.sol */ ];

document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("nftGallery");

  if (!window.ethereum) {
    gallery.innerHTML = "<p>🦊 Потрібен MetaMask</p>";
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  const balance = await contract.balanceOf(address);
  if (balance === 0n) {
    gallery.innerHTML = "<p>😢 У вас ще немає NFT-бейджів</p>";
    return;
  }

  for (let i = 0; i < Number(balance); i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(address, i);
    const tokenURI = await contract.tokenURI(tokenId);
    const metadata = await fetch(tokenURI).then(res => res.json());

    const card = document.createElement("div");
    card.className = "badge-card";
    card.innerHTML = `
      <img src="${metadata.image}" alt="${metadata.name}" width="100">
      <h3>${metadata.name}</h3>
      <p>${metadata.description}</p>
      <p><strong>ID:</strong> ${tokenId}</p>
    `;
    gallery.appendChild(card);
  }
});
});
