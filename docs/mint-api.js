// mint-api.js

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isValidIBAN(iban) {
  const CODE_LENGTHS = {
    PL: 28, UA: 29, DE: 22, FR: 27, GB: 22, // додай інші за потреби
  };

  const cleanIban = iban.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const match = cleanIban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
  if (!match || cleanIban.length !== CODE_LENGTHS[match[1]]) return false;

  const rearranged = match[3] + match[1] + match[2];
  const digits = rearranged.replace(/[A-Z]/g, ch => ch.charCodeAt(0) - 55);

  let checksum = digits.slice(0, 2);
  for (let offset = 2; offset < digits.length; offset += 7) {
    const fragment = checksum + digits.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
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
