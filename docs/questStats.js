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
#questStats {
  margin-top: 40px;
  background-color: #1c1c1c;
  border: 2px solid #00ff99;
  border-radius: 12px;
  padding: 16px;
  color: #ffffff;
  box-shadow: 0 0 12px rgba(0,255,153,0.3);
}

#questStats ul {
  list-style: none;
  padding-left: 0;
}

#questStats li {
  margin: 6px 0;
  font-size: 0.95em;
}
  statsContainer.appendChild(summary);
  statsContainer.appendChild(list);
});
