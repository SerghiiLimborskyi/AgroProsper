// mint-api.js
import { connectWallet, mintNFT } from './web3-utils.js';

export async function handleMint(role, nodeId) {
  try {
    const wallet = await connectWallet();
    const metadata = {
      name: `DAO Role: ${role}`,
      description: `Виконано дію у вузлі ${nodeId}`,
      image: `https://yourdomain.com/images/${role}.png`,
      attributes: [{ trait_type: "Node", value: nodeId }]
    };
    const tx = await mintNFT(wallet.address, metadata);
    console.log("Minted:", tx);
    return tx;
  } catch (error) {
    console.error("Minting failed:", error);
    throw error;
  }
}
