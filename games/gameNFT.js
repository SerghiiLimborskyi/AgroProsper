document.addEventListener("DOMContentLoaded", () => {
  const badgeBox = document.getElementById("badgeResult");

  function claimBadge(type) {
    fetch("/api/badge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ badgeType: type })
    })
      .then(res => res.json())
      .then(data => {
        badgeBox.innerHTML = `
          <h3>🏅 Отримано бейдж: ${data.title}</h3>
          <img src="/assets/${data.image}" alt="${data.title}" width="120">
          <p>⏱️ ${data.timestamp}</p>
        `;
      })
      .catch(err => {
        badgeBox.innerText = `❌ Помилка: ${err.message}`;
      });
  }

  // Приклад: виклик після голосування
  document.getElementById("voteYes").addEventListener("click", () => claimBadge("yes"));
  document.getElementById("voteNo").addEventListener("click", () => claimBadge("no"));
});
