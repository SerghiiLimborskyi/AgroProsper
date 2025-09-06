const badgeMint = {
  roles: ["guest", "agent", "partner", "player", "curator"],

  init: function () {
    const select = document.getElementById("badgeRoleSelect");
    this.roles.forEach(role => {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role.toUpperCase();
      select.appendChild(option);
    });
  },

  generate: function () {
    const name = document.getElementById("badgeName").value.trim();
    const role = document.getElementById("badgeRoleSelect").value;
    const desc = document.getElementById("badgeDesc").value.trim();

    if (!name || !desc) {
      alert("❗ Введіть назву та опис бейджа");
      return;
    }

    const preview = document.getElementById("badgePreview");
    preview.innerHTML = `
      <div style="border:2px solid #0f0; padding:20px; border-radius:12px; background:#111;">
        <h2 style="color:#0f0;">🏅 ${name}</h2>
        <p><strong>Роль:</strong> ${role}</p>
        <p>${desc}</p>
        <p style="color:#0f0;">🟢 Бейдж готовий до DAO-погодження</p>
      </div>
    `;
  }
};

window.addEventListener("load", () => {
  badgeMint.init();
});
