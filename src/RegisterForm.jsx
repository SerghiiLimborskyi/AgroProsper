import { useState, useEffect } from "react";
import { ethers } from "ethers";
import registryAbi from "../artifacts/contracts/UserRegistry.sol/UserRegistry.json";

const registryAddress = "0xYourUserRegistryAddress"; // ← заміни на актуальну адресу

export default function RegisterForm() {
  const [status, setStatus] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", account: "" });

  useEffect(() => {
    const checkUser = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);

      const contract = new ethers.Contract(registryAddress, registryAbi.abi, provider);
      const registered = await contract.isUser(address);
      setIsRegistered(registered);
    };
    checkUser();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const contract = new ethers.Contract(registryAddress, registryAbi.abi, signer);
    const alreadyRegistered = await contract.isUser(address);
    if (alreadyRegistered) {
      setStatus("⚠️ Ви вже зареєстровані");
      setIsRegistered(true);
      return;
    }

    try {
      const tx = await contract.register();
      await tx.wait();
      setStatus("✅ Реєстрація в смартконтракті успішна!");
      setIsRegistered(true);

      // Надсилання на бекенд
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, wallet: address }),
      });

      const result = await res.json();
      console.log("Бекенд відповів:", result);
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка реєстрації");
    }
  };

  return (
    <div>
      <h2>Реєстрація користувача</h2>
      {isRegistered ? (
        <p>🔒 Ви вже зареєстровані як <strong>{userAddress}</strong></p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Ім’я:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Рахунок (IBAN або крипто):</label>
          <input type="text" name="account" value={formData.account} onChange={handleChange} />
          <button type="submit">Зареєструватися</button>
        </form>
      )}
      <p>{status}</p>
    </div>
  );
}
