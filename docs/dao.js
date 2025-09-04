// dao.js

// Запит доступу
function requestAccess() {
  const statusDiv = document.getElementById("access-status");
  statusDiv.textContent = "⏳ Обробка запиту...";

  AgroStorage.requestAccess()
    .then(() => {
      statusDiv.textContent = "✅ Доступ надано!";
      document.getElementById("admin-panel").style.display = "block";
    })
    .catch((err) => {
      statusDiv.textContent = `❌ Помилка: ${err.message}`;
    });
}

// Перевірка прав адміністратора
function verifyAdmin() {
  const adminDiv = document.getElementById("admin-status");
  adminDiv.textContent = "⏳ Перевірка...";

  AgroAccessLog.verifyAdmin()
    .then((isAdmin) => {
      adminDiv.textContent = isAdmin
        ? "✅ Ви адміністратор"
        : "🚫 Ви не маєте прав адміністратора";
    })
    .catch((err) => {
      adminDiv.textContent = `❌ Помилка: ${err.message}`;
    });
}
