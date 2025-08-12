// script.js

document.addEventListener("DOMContentLoaded", () => {
  // DAO голосування
  const voteBtn = document.querySelector("#vote-btn");
  const resultsBtn = document.querySelector("#results-btn");

  let votes = 0;

  voteBtn?.addEventListener("click", () => {
    votes++;
    alert("✅ Голос прийнято! Дякуємо за участь.");
  });

  resultsBtn?.addEventListener("click", () => {
    alert(`📊 Поточна кількість голосів: ${votes}`);
  });

  // Баланс AGT
  const balanceEl = document.querySelector("#agt-balance");
  let agtBalance = 100; // Симуляція балансу

  if (balanceEl) {
    balanceEl.textContent = `AGT: ${agtBalance}`;
  }

  // NFT збереження
  const nftBtn = document.querySelector("#save-nft");

  nftBtn?.addEventListener("click", () => {
    const nftData = {
      name: "AgroProduct NFT",
      timestamp: new Date().toISOString(),
      owner: "user123"
    };
    localStorage.setItem("agro_nft", JSON.stringify(nftData));
    alert("🎨 NFT збережено локально!");
  });

  // AI-бот (простий відповідь)
  const chatInput = document.querySelector("#chat-input");
  const chatBtn = document.querySelector("#chat-send");

  chatBtn?.addEventListener("click", () => {
    const userText = chatInput.value.trim();
    if (userText) {
      alert(`🤖 Бот відповідає: Дякую за запит — ми працюємо над цим!`);
      chatInput.value = "";
    }
  });
});
