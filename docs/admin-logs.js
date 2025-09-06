window.addEventListener("load", () => {
  fetch("data/admin-logs.json")
    .then(res => res.json())
    .then(data => {
      window.adminLogs = data;
      renderLogTable(data);
    })
    .catch(err => console.error("❌ Не вдалося завантажити admin-logs.json", err));
});

function renderLogTable(logs) {
  const container = document.getElementById("adminLogTable");
  container.innerHTML = `
    <input type="text" id="searchInput" placeholder="🔍 Пошук по email, CID, дії..." style="width:100%; padding:10px; margin-bottom:10px;" />
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background:#0f0; color:#000;">
          <th>Дата</th>
          <th>Адміністратор</th>
          <th>Дія</th>
          <th>CID</th>
          <th>Деталі</th>
        </tr>
      </thead>
      <tbody id="logRows"></tbody>
    </table>
  `;

  document.getElementById("searchInput").addEventListener("input", filterLogs);
  updateLogRows(logs);
}

function updateLogRows(logs) {
  const rows = logs.map(log => `
    <tr style="border-bottom:1px solid #0f0;">
      <td>${new Date(log.timestamp).toLocaleString()}</td>
      <td>${log.adminEmail}</td>
      <td>${log.action}</td>
      <td>${log.targetCID}</td>
      <td>${log.details}</td>
    </tr>
  `).join("");
  document.getElementById("logRows").innerHTML = rows;
}

function filterLogs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = window.adminLogs.filter(log =>
    log.adminEmail.toLowerCase().includes(query) ||
    log.targetCID.toLowerCase().includes(query) ||
    log.action.toLowerCase().includes(query) ||
    log.details.toLowerCase().includes(query)
  );
  updateLogRows(filtered);
}
