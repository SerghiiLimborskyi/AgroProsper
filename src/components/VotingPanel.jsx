import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingDAO from "../../artifacts/contracts/VotingDAO.sol/VotingDAO.json";
import AGTToken from "../../artifacts/contracts/AGTToken.sol/AGTToken.json";
import { Pie } from "react-chartjs-2";
import { create } from "ipfs-http-client";
import { PushAPI } from "@pushprotocol/restapi";

const DAO_ADDRESS = "0xYourDAOContract";
const TOKEN_ADDRESS = "0xYourTokenContract";
const ipfs = create("https://ipfs.infura.io:5001");

export default function VotingPanelProPlus() {
  const [proposals, setProposals] = useState([]);
  const [description, setDescription] = useState("");
  const [delegateTo, setDelegateTo] = useState("");
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    async function init() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const dao = new ethers.Contract(DAO_ADDRESS, VotingDAO.abi, signer);
      const token = new ethers.Contract(TOKEN_ADDRESS, AGTToken.abi, signer);
      const user = await signer.getAddress();

      setSigner(signer);
      setContract(dao);
      setTokenContract(token);
      setUserAddress(user);

      const admin = await dao.admin();
      setIsAdmin(admin.toLowerCase() === user.toLowerCase());

      const all = await dao.getAllProposals();
      setProposals(all);
    }
    init();
  }, []);

  const createProposal = async () => {
    const { path } = await ipfs.add(description);
    const tx = await contract.createProposal(path);
    await tx.wait();
    sendNotification("New Proposal Created", "Check out the latest proposal in AgroDAO");
    setDescription("");
  };

  const vote = async (id) => {
    const tx = await contract.vote(id);
    await tx.wait();
    sendNotification("Vote Submitted", `You voted on proposal #${id}`);
  };

  const closeProposal = async (id) => {
    const tx = await contract.closeProposal(id);
    await tx.wait();
  };

  const delegate = async () => {
    const tx = await tokenContract.delegateVotes(delegateTo);
    await tx.wait();
    setDelegateTo("");
  };

  const sendNotification = async (title, body) => {
    await PushAPI.sendNotification({
      title,
      body,
      recipient: userAddress,
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🛠️ VotingPanelProPlus</h2>

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Proposal description"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={createProposal}>Create Proposal</button>

      <input
        value={delegateTo}
        onChange={(e) => setDelegateTo(e.target.value)}
        placeholder="Delegate to address"
        style={{ width: "100%", marginTop: "10px" }}
      />
      <button onClick={delegate}>Delegate Votes</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {proposals.map((p, i) => {
          const now = Math.floor(Date.now() / 1000);
          const timeLeft = p.deadline - now;
          return (
            <li key={i} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
              <strong>{p.description}</strong><br />
              Votes: {p.voteCount.toString()}<br />
              Status: {p.active ? "🟢 Active" : "🔴 Closed"}<br />
              ⏳ {timeLeft > 0 ? `${timeLeft}s left` : "Expired"}<br />
              <button disabled={!p.active} onClick={() => vote(i)}>Vote</button>
              {isAdmin && <button onClick={() => closeProposal(i)}>Close</button>}
              <Pie
                data={{
                  labels: ["Votes", "Remaining"],
                  datasets: [{
                    data: [p.voteCount.toNumber(), 100 - p.voteCount.toNumber()],
                    backgroundColor: ["#36A2EB", "#FFCE56"]
                  }]
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
