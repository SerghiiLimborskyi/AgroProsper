document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("badgeGallery");

  fetch("/data/badges.json")
    .then(res => res.json())
    .then(badges => {
      if (!badges.length) {
        gallery.innerHTML = "<p>😢 У вас ще немає бейджів</p>";
        return;
      }

      badges.forEach(badge => {
        const card = document.createElement("div");
        card.className = "badge-card";
        card.innerHTML = `
          <img src="/assets/${badge.image}" alt="${badge.title}" width="100">
          <h3>${badge.title}</h3>
          <p>${new Date(badge.timestamp).toLocaleString()}</p>
        `;
        gallery.appendChild(card);
      });
    })
    .catch(err => {
      gallery.innerHTML = `<p>❌ Помилка: ${err.message}</p>`;
    });
});
