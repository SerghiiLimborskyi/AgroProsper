window.addEventListener("load", () => {
  const adminEmail = localStorage.getItem("adminEmail");
  if (!["agroprosper74@gmail.com", "serhiilimborskyi@gmail.com", "lymborsky@gmail.com"].includes(adminEmail)) {
    document.body.innerHTML = "<h2 style='color:red; text-align:center;'>⛔ Доступ лише для адміністраторів AgroProsper</h2>";
    return;
  }

  fetch("data/terms-log.json")
    .then(res => res.json())
    .then(data => renderAdminPanel(data))
    .catch(err => console.error("❌ Не вдалося завантажити terms-log.json", err));
});

function renderAdminPanel(users) {
  const panel = document.createElement("div");
  panel.innerHTML = `<h2>📋 Підтвердження згоди користувачів</h2>`;
  users.forEach((user, index) => {
    const row = document.createElement("div");
    row.style = "border-bottom:1px solid #0f0; padding:10px;";
    row.innerHTML = `
      <strong>${user.userName}</strong> (${user.cid})<br>
      Згода: ${user.agreedAt ? "✅" : "❌"}<br>
      <button onclick="confirmAgreement(${index})">✅ Підтвердити вручну</button>
    `;
    panel.appendChild(row);
  });
  document.body.appendChild(panel);
}

function confirmAgreement(index) {
  fetch("data/terms-log.json")
    .then(res => res.json())
    .then(data => {
      data[index].agreedAt = new Date().toISOString();
      // 🔄 Надсилання оновлення до DAO-архіву (псевдо-API)
      fetch("https://api.agroprosper.cloud/terms-log/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data[index])
      })
      .then(res => res.ok ? alert("✅ Згоду оновлено") : alert("⚠️ Помилка оновлення"))
      .catch(err => console.error("❌ DAO Sync Error:", err));
    });
}
