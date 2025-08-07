// mint-api.js
import { isAddress } from "ethers"; // переконайся, що встановлено: npm install ethers

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isValidIBAN(iban) {
  const CODE_LENGTHS = { PL: 28, UA: 29, DE: 22, FR: 27, GB: 22 };
  const clean = iban.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const match = clean.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
  if (!match || clean.length !== CODE_LENGTHS[match[1]]) return false;

  const rearranged = match[3] + match[1] + match[2];
  const digits = rearranged.replace(/[A-Z]/g, ch => ch.charCodeAt(0) - 55);
  let checksum = digits.slice(0, 2);
  for (let i = 2; i < digits.length; i += 7) {
    checksum = parseInt(checksum + digits.slice(i, i + 7), 10) % 97;
  }
  return checksum === 1;
}

export async function handleMint(userData) {
  const { name, email, account, wallet } = userData;

  if (!name || !email || !account || !wallet) {
    console.error("❌ Всі поля обов’язкові");
    return;
  }

  if (!isValidEmail(email)) {
    console.error("❌ Невірний формат email");
    return;
  }

  if (!isValidIBAN(account)) {
    console.error("❌ Невірний IBAN");
    return;
  }

  if (!isAddress(wallet)) {
    console.error("❌ Невірна Ethereum-адреса");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Помилка реєстрації");
    }

    console.log("✅ Реєстрація успішна:", result.message);
  } catch (error) {
    console.error("❌ Помилка при реєстрації:", error.message);
  }
}
