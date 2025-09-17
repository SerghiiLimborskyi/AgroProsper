export function checkGuestAccess() {
  const cid = localStorage.getItem("cid");
  if (!cid) {
    alert("👤 Ви гість. CID не активовано.");
    document.body.classList.add("guest");
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `
        <h1>👤 Ви гість у системі AgroProsper DAO</h1>
        <p>Щоб отримати доступ до дій, активуйте свій DAO-паспорт (CID).</p>
        <a href="index.html">🔑 Активувати CID</a>
      `;
    }
  } else {
    console.log("✅ CID знайдено: " + cid);
  }
}
