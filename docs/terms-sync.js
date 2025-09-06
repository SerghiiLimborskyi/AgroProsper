window.addEventListener("load", () => {
  const agreed = localStorage.getItem("termsAccepted");
  const cid = localStorage.getItem("cid") || "0xGUEST-" + Date.now();
  const userName = localStorage.getItem("userName") || "Невідомий";
  const language = navigator.language || "uk";
  const timestamp = new Date().toISOString();

  if (agreed === "true") {
    const payload = {
      cid,
      userName,
      agreedAt: timestamp,
      language,
      version: "Microsoft Services Agreement v2025.09"
    };

    // 🔗 Відправка до хмарного DAO-архіву (псевдо-API)
    fetch("https://api.agroprosper.cloud/terms-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(res => res.ok ? console.log("✅ Згода синхронізована") : console.warn("⚠️ Помилка синхронізації"))
    .catch(err => console.error("❌ DAO Sync Error:", err));
  }
});
