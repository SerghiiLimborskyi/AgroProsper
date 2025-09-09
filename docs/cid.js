// cid.js

function activateCID() {
  const cidInput = document.getElementById("cidInput");
  const cid = cidInput.value.trim();

  if (!cid) {
    alert("⚠️ Введіть свій CID для активації.");
    return;
  }

  // Збереження CID у локальному сховищі
  localStorage.setItem("cid", cid);

  // Визначення ролі
  let role = "Гість";
  if (cid.startsWith("DAO-")) role = "Агент DAO";
  if (cid.startsWith("SP-")) role = "Супер Партнер";
  if (cid.startsWith("ETH-")) role = "Етичний Куратор";

  // Відображення ролі
  document.body.setAttribute("data-role", role);
  alert(`✅ CID активовано. Ваша роль: ${role}`);

  // Відображення прогнозу дії (інтеграція з quantumCID.js)
  if (typeof quantumCID !== "undefined") {
    quantumCID.displayPrediction();
  }
}

// Автоматичне відображення ролі при завантаженні сторінки
window.addEventListener("DOMContentLoaded", () => {
  const cid = localStorage.getItem("cid");
  if (cid) {
    document.getElementById("cidInput").value = cid;
    activateCID();
  }
});
