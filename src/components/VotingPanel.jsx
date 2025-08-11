import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingDAO from "../../artifacts/contracts/VotingDAO.sol/VotingDAO.json";

const CONTRACT_ADDRESS = "0xYourContractAddressHere";

export default function VotingPanel() {
  const [proposals, setProposals] = useState([]);
  const [description, setDescription] = useState("");
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function init() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingDAO.abi, signer);
      setSigner(signer);
      setContract(contract);

      const all = await contract.getAllProposals();
      setProposals(all);
    }
    init();
  }, []);

  const createProposal = async () => {
    const tx = await contract.createProposal(description);
    await tx.wait();
    setDescription("");
  };

  const vote = async (id) => {
    const tx = await contract.vote(id);
    await tx.wait();
  };

  const closeProposal = async (id) => {
    const tx = await contract.closeProposal(id);
    await tx.wait();
  };

  return (
    <div>
      <h2>Voting Panel</h2>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="New proposal"
      />
      <button onClick={createProposal}>Create</button>

      <ul>
        {proposals.map((p, i) => (
          <li key={i}>
            <strong>{p.description}</strong> — Votes: {p.voteCount.toString()} —{" "}
            {p.active ? "🟢 Active" : "🔴 Closed"}
            <button onClick={() => vote(i)}>Vote</button>
            <button onClick={() => closeProposal(i)}>Close</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
