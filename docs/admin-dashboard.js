document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("adminCID").textContent = localStorage.getItem("cid") || "0xADMIN-XXXX";

  // DAO-графік токенів
  new Chart(document.getElementById("tokenChart"), {
    type: "doughnut",
    data: {
      labels: ["Фермери", "Трейдери", "Адміністратори"],
      datasets: [{
        data: [120, 80, 20],
        backgroundColor: ["#00ff99", "#ffcc00", "#ff3366"]
      }]
    }
  });

  // DAO-графік квестів
  new Chart(document.getElementById("questChart"), {
    type: "bar",
    data: {
      labels: ["Солодкий вибір", "Печера Коріння", "Павутина добра"],
      datasets: [{
        label: "Виконано",
        data: [42, 35, 27],
        backgroundColor: "#00ff99"
      }]
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
  const agents = JSON.parse(localStorage.getItem("agentList") || "[]");
  const list = document.getElementById("agentList");
  const logs = document.getElementById("agentLogs");
  const consent = document.getElementById("consentCheck");

  // Вивід агентів
  list.innerHTML = "";
  agents.forEach(agent => {
    const li = document.createElement("li");
    li.textContent = `${agent.name} (${agent.role}) — ${agent.cid}`;
    list.appendChild(li);
  });

  // CID-графік
  const stats = { Starter: 0, Farmer: 0, Trader: 0, Partner: 0, Agent: 0 };
  agents.forEach(a => stats[a.role] = (stats[a.role] || 0) + 1);

  new Chart(document.getElementById("agentChart"), {
    type: "bar",
    data: {
      labels: Object.keys(stats),
      datasets: [{
        label: "Агентів",
        data: Object.values(stats),
        backgroundColor: "#00ff99"
      }]
    }
  });

  // Логи (симуляція)
  logs.textContent = JSON.stringify(agents.slice(-5), null, 2);

  // Перевірка згоди
  const missing = agents.filter(a => !a.agreeConf || !a.agreeMS);
  consent.innerHTML = missing.length > 0
    ? `⚠️ ${missing.length} агентів без повної згоди`
    : "✅ Всі агенти погодились з умовами";
});

  // Баланс токенів
  document.getElementById("agtBalance").textContent = "AGT: 1000";

  // Логи
  fetch("admin-kit/admin-logs.json")
    .then(res => res.json())
    .then(logs => {
      document.getElementById("adminLogs").textContent = JSON.stringify(logs, null, 2);
    });
});

function simulateTransfer() {
  alert("💸 Переказ 50 AGT успішно симульовано!");
}

function openAgentMonitor() {
  window.open("agent-monitor.html", "_blank");
}
