document.addEventListener("DOMContentLoaded", function () {
  // Запит до status.json з DAO
  fetch("https://serghiilimborskyi.github.io/AgroProsper/status.json")
    .then((response) => response.json())
    .then((data) => {
      const modules = data.components || [];
      const version = data.version || "—";
      const date = data.date || "—";

      // Запис заголовка версії DAO
      const header = document.querySelector("h1");
      if (header) {
        header.innerHTML += ` <span style="font-size:0.8em;">(DAO ${version} — ${date})</span>`;
      }

      // Оновлення таблиці
      const tableBody = document.querySelector("table tbody");
      if (tableBody) {
        tableBody.innerHTML = "";
        modules.forEach((mod) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${mod}</td>
            <td>${date}</td>
            <td>✅</td>
          `;
          tableBody.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("❌ Не вдалося отримати status.json:", error);
    });
});
