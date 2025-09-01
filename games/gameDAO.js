document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("voteYes");
  const noBtn = document.getElementById("voteNo");
  const resultBox = document.getElementById("voteResult");

  yesBtn.addEventListener("click", () => submitVote("yes"));
  noBtn.addEventListener("click", () => submitVote("no"));

  function submitVote(option) {
    fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: option })
    })
      .then(res => res.json())
      .then(data => {
        resultBox.innerText = `✅ Голос прийнято: ${option.toUpperCase()}\n🗳️ Статистика: Так — ${data.yes}, Ні — ${data.no}`;
      })
      .catch(err => {
        resultBox.innerText = `❌ Помилка: ${err.message}`;
      });
  }
});
