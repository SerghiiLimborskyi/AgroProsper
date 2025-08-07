<form id="registerForm" onSubmit={handleFormSubmit}>
  <label>Ім’я:</label><input type="text" name="name" required />
  <label>Email:</label><input type="email" name="email" required />
  <label>Рахунок (IBAN або крипто):</label><input type="text" name="account" />
  <button type="submit">Зареєструватися</button>
</form>
<script>
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const userData = Object.fromEntries(data);
  console.log("Реєстрація:", userData);
  alert("Реєстрація успішна!");
});
 const handleFormSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const userData = Object.fromEntries(data);

  try {
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    console.error("Помилка надсилання:", err);
    alert("❌ Не вдалося зареєструватися");
  }
};
 
</script>
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import registryAbi from "../artifacts/contracts/UserRegistry.sol/UserRegistry.json";

const registryAddress = "0xYourUserRegistryAddress"; // ← заміни

export default function RegisterForm() {
  const [status, setStatus] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");

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
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const handleRegister = async () => {
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
      setStatus("✅ Реєстрація успішна!");
      setIsRegistered(true);
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка реєстрації");
    }
  };

  return (
    <div>
      <h2>Реєстрація користувача</h2>
      {isLoading ? (
        <p>⏳ Перевірка статусу...</p>
      ) : isRegistered ? (
        <p>🔒 Ви вже зареєстровані як <strong>{userAddress}</strong></p>
      ) : (
        <>
          <p>👤 Адреса: <strong>{userAddress}</strong></p>
          <button onClick={handleRegister}>Зареєструватися</button>
        </>
      )}
      <p>{status}</p>
    </div>
  );
}
