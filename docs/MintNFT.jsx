import { useState } from "react";
import { ethers } from "ethers";
import AgroNFT from "../abis/AgroNFT.json"; // ABI

const CONTRACT_ADDRESS = "0xYourContractAddress";

export default function MintNFT() {
  const [uri, setUri] = useState("");
  const [status, setStatus] = useState("");

  const mint = async () => {
    if (!window.ethereum) return alert("MetaMask не знайдено");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, AgroNFT, signer);

    try {
      const tx = await contract.mintNFT(await signer.getAddress(), uri);
      await tx.wait();
      setStatus("✅ NFT успішно змінчено!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка при мінтингу");
    }
  };

  return (
    <div>
      <h2>🧬 Мінтинг NFT</h2>
      <input
        type="text"
        placeholder="Встав URI токена (IPFS)"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        className="border p-2"
      />
      <button onClick={mint} className="ml-2 bg-dao px-4 py-2 rounded">
        Mint
      </button>
      <p>{status}</p>
    </div>
  );
}
