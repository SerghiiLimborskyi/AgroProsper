// questStats.js — DAO-прогрес квестів

document.addEventListener("DOMContentLoaded", () => {
  const completed = JSON.parse(localStorage.getItem("completedQuests") || "[]");

  const quests = [
    { id: "sweet", title: "Солодкий вибір" },
    { id: "root", title: "Печера Коріння" },
    { id: "web", title: "Павутина добра" },
    { id: "hydro", title: "Гідропонічний виклик" },
    { id: "ethics", title: "Етичний фермер" }
  ];

  const statsContainer = document.getElementById("questStats");
  if (!statsContainer) return;

  const total = quests.length;
  const done = completed.length;

  const summary = document.createElement("p");
  summary.innerHTML = `📊 Виконано: <strong>${done}</strong> з <strong>${total}</strong> квестів`;

  const list = document.createElement("ul");
  quests.forEach(q => {
    const item = document.createElement("li");
    const status = completed.includes(q.id) ? "✅" : "⏳";
    item.textContent = `${status} ${q.title}`;
    list.appendChild(item);
  });

  statsContainer.appendChild(summary);
  statsContainer.appendChild(list);
});
