<form id="registerForm">
  <label>Ім’я:</label><input type="text" name="name" required>
  <label>Email:</label><input type="email" name="email" required>
  <label>Рахунок (IBAN або крипто):</label><input type="text" name="account">
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
</script>
import { useState } from "react";
import { ethers } from "ethers";
import registryAbi from "../artifacts/contracts/UserRegistry.sol/UserRegistry.json";

const registryAddress = "0xYourUserRegistryAddress"; // ← заміни

export default function RegisterForm() {
  const [status, setStatus] = useState("");

  const handleRegister = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(registryAddress, registryAbi.abi, signer);

    try {
      const tx = await contract.register();
      await tx.wait();
      setStatus("✅ Реєстрація успішна!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка реєстрації");
    }
  };

  return (
    <div>
      <h2>Реєстрація користувача</h2>
      <button onClick={handleRegister}>Зареєструватися</button>
      <p>{status}</p>
    </div>
  );
}
