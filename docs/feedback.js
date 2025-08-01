// feedback.js

// Псевдо-функція для Web3-збереження DAO-відгуку
async function submitFeedbackToDAO(name, message, vote) {
  if (!window.ethereum) {
    alert("❌ Web3 не доступний. Підключіть гаманець.");
    return;
  }

  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const user = accounts[0];

    // Тут має бути інтеграція з DAO-контрактом
    console.log("📨 Відгук від:", user);
    console.log("👤 Ім’я:", name);
    console.log("💬 Повідомлення:", message);
    console.log("🗳 Оцінка:", vote);

    // Псевдо-збереження
    alert(`✅ Відгук надіслано від ${user}. DAO-оцінка: ${vote}⭐`);
  } catch (error) {
    console.error("❌ Помилка Web3:", error);
    alert("Не вдалося надіслати відгук через Web3.");
  }
}
