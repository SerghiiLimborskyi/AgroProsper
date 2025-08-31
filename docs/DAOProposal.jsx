import { useState } from "react";
import { ethers } from "ethers";
import DAOABI from "../abis/DAOProposal.json";

const DAO_ADDRESS = "0xYourDAOContractAddress";

export default function DAOProposal() {
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");

  const create = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(DAO_ADDRESS, DAOABI, signer);

    try {
      const tx = await contract.createProposal(desc);
      await tx.wait();
      setStatus("✅ Пропозицію створено");
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка");
    }
  };

  return (
    <div>
      <h2>🗳️ Створити DAO-пропозицію</h2>
      <input
        type="text"
        placeholder="Опис пропозиції"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2"
      />
      <button onClick={create} className="ml-2 bg-dao px-4 py-2 rounded">
        Створити
      </button>
      <p>{status}</p>
    </div>
  );
}
