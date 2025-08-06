import { useState } from "react";
import { ethers } from "ethers";
import registryAbi from "../artifacts/contracts/UserRegistry.sol/UserRegistry.json";

const registryAddress = "0xYourUserRegistryAddress"; // ← заміни

export default function RewardUser() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleReward = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(registryAddress, registryAbi.abi, signer);

    try {
      const tx = await contract.rewardUser(recipient, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert("Reward sent!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  return (
    <div>
      <h2>Reward User</h2>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount (AGT)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleReward}>Send Reward</button>
    </div>
  );
}
