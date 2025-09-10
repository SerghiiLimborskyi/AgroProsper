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
