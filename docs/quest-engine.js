// quest-engine.js — інтерактивне проходження DAO-квестів

document.addEventListener("DOMContentLoaded", () => {
  const quests = [
    {
      id: "sweet",
      title: "Солодкий вибір",
      description: "🍬 Обери між прибутком і етикою",
      badge: "Цукерочка з лікером",
      roleIndex: 0
    },
    {
      id: "root",
      title: "Печера Коріння",
      description: "🌱 Знайди джерело агро-даних",
      badge: "Корінь прозорості",
      roleIndex: 1
    },
    {
      id: "web",
      title: "Павутина добра",
      description: "🕸️ Зареєструйся як агент DAO",
      badge: "DAO-агент",
      roleIndex: 1
    },
    {
      id: "hydro",
      title: "Гідропонічний виклик",
      description: "💧 Збалансуй водну систему",
      badge: "Водний розум",
      roleIndex: 2
    },
    {
      id: "ethics",
      title: "Етичний фермер",
      description: "🧠 Пройди тест на етичність",
      badge: "Серце DAO",
      roleIndex: 2
    }
  ];

  const container = document.getElementById("questGallery");
  if (!container) return;

  quests.forEach(q => {
    const card = document.createElement("div");
    card.className = "quest-card";

    const title = document.createElement("h3");
    title.textContent = q.title;

    const desc = document.createElement("p");
    desc.textContent = q.description;

    const button = document.createElement("button");
    button.textContent = "✅ Пройти квест";
    button.onclick = () => completeQuest(q);

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(button);
    container.appendChild(card);
  });
});

function completeQuest(q) {
  let completed = JSON.parse(localStorage.getItem("completedQuests") || "[]");
  if (completed.includes(q.id)) {
    alert("🔁 Цей квест вже виконано.");
    return;
  }

  completed.push(q.id);
  localStorage.setItem("completedQuests", JSON.stringify(completed));

  // Видача бейджа
  if (typeof mintBadgeSelf === "function") {
    mintBadgeSelf(q.roleIndex);
  }

  alert(`🎉 Квест "${q.title}" виконано!\n🏅 Бейдж: ${q.badge}`);
}
