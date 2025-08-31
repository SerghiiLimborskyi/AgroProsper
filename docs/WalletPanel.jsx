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
