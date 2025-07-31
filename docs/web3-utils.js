// web3-utils.js
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xYourContractAddress";
const ABI = [ /* ABI твого NFT/SBT контракту */ ];

export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask не знайдено");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return signer;
}

export async function mintNFT(to, metadata) {
  const signer = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  const tx = await contract.mint(to, metadata);
  return tx;
}
