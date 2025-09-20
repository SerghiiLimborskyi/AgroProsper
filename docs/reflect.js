// reflect.js — DAO CID Analyzer & Role Reflector

(function () {
  const cid = localStorage.getItem("userCID") || "AG-SL-X7K9QZ-2025";
  const role = localStorage.getItem("agentLevel") || "Starter";
  const lang = navigator.language.startsWith("pl") ? "pl"
             : navigator.language.startsWith("en") ? "en"
             : "uk";

  const messages = {
    uk: {
      title: "🧠 DAO-Рефлексія",
      cidLabel: "CID агента:",
      roleLabel: "Роль:",
      status: "Статус системи:",
      active: "🟢 Активна",
      inactive: "🔴 Неактивна",
      tip: "Використовуйте CID для доступу до сцен, квестів і контрактів"
    },
    pl: {
      title: "🧠 DAO-Refleksja",
      cidLabel: "CID agenta:",
      roleLabel: "Rola:",
      status: "Status systemu:",
      active: "🟢 Aktywny",
      inactive: "🔴 Nieaktywny",
      tip: "Użyj CID, aby uzyskać dostęp do scen, zadań i kontraktów"
    },
    en: {
      title: "🧠 DAO Reflection",
      cidLabel: "Agent CID:",
      roleLabel: "Role:",
      status: "System status:",
      active: "🟢 Active",
      inactive: "🔴 Inactive",
      tip: "Use CID to access scenes, quests, and contracts"
    }
  };

  const t = messages[lang];
  const status = cid ? t.active : t.inactive;

  const container = document.createElement("div");
  container.style = `
    background: rgba(0,0,0,0.6);
    color: #00ff99;
    font-family: Montserrat, sans-serif;
    padding: 20px;
    margin: 20px auto;
    border-radius: 12px;
    max-width: 600px;
    text-align: center;
  `;

  container.innerHTML = `
    <h2>${t.title}</h2>
    <p><strong>${t.cidLabel}</strong> ${cid}</p>
    <p><strong>${t.roleLabel}</strong> ${role}</p>
    <p><strong>${t.status}</strong> ${status}</p>
    <hr style="border-color:#00ff99;" />
    <p style="font-size:13px; color:#ccc;">${t.tip}</p>
  `;

  document.body.appendChild(container);
})();
