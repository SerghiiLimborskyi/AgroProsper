// mint-api.js
import { connectWallet, mintNFT } from './web3-utils.js';
import React, { useEffect } from "react";
import { logAppEvent } from "../utils/analytics";

const Docs = () => {
  useEffect(() => {
    logAppEvent("screen_view", { screen_name: "Docs" });
  }, []);

  const handleDownload = (docName) => {
    logAppEvent("document_downloaded", { name: docName });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📄 Документи</h1>
      <button onClick={() => handleDownload("DAO_Whitepaper")}>Завантажити Whitepaper</button>
    </div>
  );
};

export default Docs;


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
