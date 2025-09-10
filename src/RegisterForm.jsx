import React, { useState } from "react";
import Web3 from "web3";
import contractABI from "../contracts/UserRegistry.json";
import VotingPanel from "./components/VotingPanel";
...
<VotingPanel />

const web3 = new Web3(process.env.REACT_APP_SEPOLIA_RPC_URL);
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

function submitAgent() {
  const name = document.getElementById("agentName").value.trim();
  const cid = document.getElementById("agentCID").value.trim();
  const role = document.getElementById("agentRole").value;
  const agree = document.getElementById("agreeTerms").checked;

  if (!name || !cid || !role || !agree) {
    alert("❗ Заповніть всі поля та погодьтесь з умовами");
    return;
  }

  const agent = { name, cid, role, registeredAt: Date.now() };
  let agents = JSON.parse(localStorage.getItem("agentList") || "[]");
  agents.push(agent);
  localStorage.setItem("agentList", JSON.stringify(agents));

  document.getElementById("registerResult").innerHTML = `🎉 Агент ${name} (${role}) зареєстрований`;
}

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);

    try {
      const tx = contract.methods.registerUser(name, email);
      const gas = await tx.estimateGas({ from: account.address });
      const data = tx.encodeABI();

      const signedTx = await web3.eth.accounts.signTransaction({
        to: contractAddress,
        data,
        gas,
      }, PRIVATE_KEY);

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      alert(`✅ Registered: ${receipt.transactionHash}`);
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
