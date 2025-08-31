import React, { useState } from 'react';
import { ethers } from 'ethers';
import { uploadMetadata } from '../services/ipfs';
import AGT_ABI from '../abis/AGTToken.json';
import NFT_ABI from '../abis/NFTContract.json';

const AGT_ADDRESS = '0xYourAGTTokenAddress';
const NFT_ADDRESS = '0xYourNFTContractAddress';

export default function MintNFT() {
  const [status, setStatus] = useState('');
  const [minting, setMinting] = useState(false);

  const metadata = {
    name: "AgroBadge #42",
    description: "CID-бейдж учасника DAO",
    image: "https://ipfs.io/ipfs/QmImageCID", // заміни на реальний CID
    attributes: [
      { trait_type: "Ферма", value: "Зелений луг" },
      { trait_type: "Статус", value: "Активний" }
    ]
  };

  const hasVotingPower = async (address) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(AGT_ADDRESS, AGT_ABI, provider);
    const balance = await contract.balanceOf(address);
    return balance > 0;
  };

  const mintNFT = async () => {
    if (minting) return;
    setMinting(true);
    setStatus("⏳ Мінтинг NFT...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const eligible = await hasVotingPower(address);
      if (!eligible) {
        setStatus("❌ Недостатньо AGT для мінтингу");
        setMinting(false);
        return;
      }

      const uri = await uploadMetadata(metadata);
      const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      const tx = await nftContract.mintNFT(address, uri);
      await tx.wait();

      setStatus("✅ NFT успішно змінчено!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка: " + err.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="mint-panel">
      <h2>🎖️ Мінтинг AgroBadge</h2>
      <button disabled={minting} onClick={mintNFT}>
        {minting ? "Мінтинг..." : "Mint NFT"}
      </button>
      <p>{status}</p>
    </div>
  );
}
