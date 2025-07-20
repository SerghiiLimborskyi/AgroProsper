document.addEventListener("DOMContentLoaded", function () {
  const modules = [
    { name: "index.html", date: "2025-08-02" },
    { name: "dashboard.html", date: "2025-07-28" },
    { name: "charity-verify.html", date: "2025-07-27" },
    { name: "dao-humble-mode.html", date: "2025-07-25" },
    { name: "soulnode.html", date: "2025-07-25" },
    { name: "submission-review.html", date: "2025-07-23" },
    { name: "telegram-auth.html", date: "2025-07-22" },
    { name: "govbook-v2.html", date: "2025-07-20" },
  ];

  const tableBody = document.querySelector("table").getElementsByTagName("tbody")[0];
  if (tableBody) {
    tableBody.innerHTML = "";
    modules.forEach((mod) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${mod.name}</td>
        <td>${mod.date}</td>
        <td>✅</td>
      `;
      tableBody.appendChild(row);
    });
  }
});
