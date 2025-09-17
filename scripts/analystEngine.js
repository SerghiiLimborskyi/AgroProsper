export function initAnalystMode() {
  const cid = localStorage.getItem("cid");
  if (!cid) {
    alert("🔍 Ви не активували CID. Аналітичний режим недоступний.");
    return;
  }

  const role = localStorage.getItem("role");
  if (role !== "analyst") {
    alert("⛔ Ви не аналітик DAO. Доступ обмежено.");
    return;
  }

  document.body.classList.add("analyst");
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = `
      <h1>📊 Аналітична панель DAO</h1>
      <p>Ваша роль: <strong>${role}</strong></p>
      <p>CID: <strong>${cid}</strong></p>
      <p>🔎 Ви можете переглядати ринкові дані, формувати звіти та впливати на DAO-рішення.</p>
    `;
  }
}
