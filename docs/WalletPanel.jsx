import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function WalletPanel() {
  const [balance, setBalance] = useState('0');
  const [address, setAddress] = useState('');

  async function connectWallet() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    const bal = await provider.getBalance(addr);
    setAddress(addr);
    setBalance(ethers.formatEther(bal));
  }

  return (
    <div>
      <h2>💰 AGT-гаманець</h2>
      <button onClick={connectWallet}>🔗 Підключити</button>
      {address && (
        <div>
          <p>Адреса: {address}</p>
          <p>Баланс: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletPanel() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(selectedAccount);
    } else {
      alert("MetaMask не знайдено");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div>
      <h2>💼 Web3-гаманець</h2>
      {account ? (
        <p>🔗 Підключено: {account}</p>
      ) : (
        <button onClick={connectWallet}>Підключити MetaMask</button>
      )}
    </div>
  );
}
