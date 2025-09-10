document.addEventListener("DOMContentLoaded", () => {
  const agents = JSON.parse(localStorage.getItem("agentList") || "[]");
  const stats = { Starter: 0, Farmer: 0, Trader: 0, Partner: 0, Agent: 0 };
  const seenCID = new Set();
  const duplicates = [];

  // CID-графік
  agents.forEach(agent => {
    const level = agent.level || "Starter";
    stats[level]++;
    if (seenCID.has(agent.cid)) {
      duplicates.push(agent.cid);
    } else {
      seenCID.add(agent.cid);
    }
  });

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

  // Список агентів
  const list = document.getElementById("agentList");
  const filter = document.getElementById("roleFilter");
  const renderList = () => {
    list.innerHTML = "";
    const role = filter.value;
    agents.forEach(agent => {
      if (role === "all" || agent.level === role) {
        const li = document.createElement("li");
        li.textContent = `${agent.cid} — ${agent.level}`;
        list.appendChild(li);
      }
    });
  };
  filter.onchange = renderList;
  renderList();

  // CID-безпека
  const cidSecurity = document.getElementById("cidSecurity");
  if (duplicates.length > 0) {
    cidSecurity.innerHTML = `⚠️ Виявлено дублікати CID: <strong>${duplicates.join(", ")}</strong>`;
  } else {
    cidSecurity.innerHTML = "✅ CID-база без конфліктів.";
  }

  // Логи
  fetch("admin-kit/admin-logs.json")
    .then(res => res.json())
    .then(logs => {
      document.getElementById("agentLogs").textContent = JSON.stringify(logs.slice(-10), null, 2);
    });
});
