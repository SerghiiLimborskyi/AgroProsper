// Лічильник проєктів
const rows = document.querySelectorAll("table tbody tr");
document.getElementById("totalCount").textContent = rows.length;

// Лічильник фізичних реєстрацій
let physical = 0;
rows.forEach(row => {
  const cell = row.cells[2].textContent.trim().toLowerCase();
  if (cell === "так") physical++;
});
document.getElementById("physicalCount").textContent = physical;

// Лічильник переглядів (локальний)
const key = "pageViewCount";
let count = localStorage.getItem(key) || 0;
count++;
localStorage.setItem(key, count);
document.getElementById("viewCount").textContent = count;
