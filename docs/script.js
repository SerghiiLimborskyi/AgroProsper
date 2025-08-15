document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".link-button");

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const label = btn.textContent.trim();
      console.log(`Користувач обрав: ${label}`);

      // DAO-логіка: збереження переходу
      localStorage.setItem("lastAction", label);

      // Псевдо-ігрова реакція
      if (label === "Створити NFT") {
        alert("🎨 Ви отримали NFT-бейдж!");
      } else if (label === "Проголосувати") {
        alert("🗳️ Ваш голос враховано в DAO!");
      }
    });
  });

  // Вивід останньої дії
  const last = localStorage.getItem("lastAction");
  if (last) {
    console.log(`Остання дія користувача: ${last}`);
  }
});
