// badgeViewer.js — перегляд локальних NFT-бейджів

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("badgeContainer");
  if (!container) return;

  const badges = JSON.parse(localStorage.getItem("badges") || "[]");

  if (badges.length === 0) {
    container.innerHTML = "<p>😔 Бейджі ще не видано.</p>";
    return;
  }

  badges.forEach(badge => {
    const card = document.createElement("div");
    card.className = "badge-card";

    const img = document.createElement("img");
    img.src = `media/${badge.image}`;
    img.alt = badge.title;
    img.title = badge.title;

    const title = document.createElement("h4");
    title.textContent = badge.title;

    const time = document.createElement("p");
    time.textContent = `🕒 ${new Date(badge.timestamp).toLocaleString()}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(time);
    container.appendChild(card);
  });
});
