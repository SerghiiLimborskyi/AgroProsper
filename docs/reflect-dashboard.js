(function () {
  const lang = navigator.language.startsWith("pl") ? "pl"
             : navigator.language.startsWith("en") ? "en"
             : "uk";

  const t = {
    uk: {
      support: "🗳️ Підтримати реліз",
      cidStatus: "CID-система активна",
      role: "Роль",
      videoTitle: "🎥 Відео-звернення AgroProsper V7 — “Незупинна автономність”"
    },
    pl: {
      support: "🗳️ Wesprzyj wydanie",
      cidStatus: "System CID aktywny",
      role: "Rola",
      videoTitle: "🎥 Wideo AgroProsper V7 — “Niezatrzymana autonomia”"
    },
    en: {
      support: "🗳️ Support the release",
      cidStatus: "CID system active",
      role: "Role",
      videoTitle: "🎥 AgroProsper V7 Video — “Unstoppable Autonomy”"
    }
  };

  const tr = t[lang];
  const cid = localStorage.getItem("userCID") || "0x000";
  const role = localStorage.getItem("agentLevel") || "Starter";

  const container = document.getElementById("reflectDashboard");
  if (!container) return;

  container.innerHTML = `
    <h2 style="color:#00ff99; font-family:'Montserrat',sans-serif;">${tr.videoTitle}</h2>
    <div class="video-block" style="margin:20px 0;">
      <video controls autoplay muted loop width="100%">
        <source src="AgroProsperV7_Unstoppable.mp4" type="video/mp4">
        <track src="subtitles_ua.vtt" kind="subtitles" srclang="uk" label="Українська">
        <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
        <track src="subtitles_pl.vtt" kind="subtitles" srclang="pl" label="Polski">
      </video>
      <button onclick="voteDAO()" style="margin-top:10px; padding:10px 20px; background:#00a859; color:#fff; border:none; border-radius:6px; font-size:16px;">
        ${tr.support}
      </button>
    </div>
    <div style="font-size:14px; color:#ccc; font-family:'Montserrat',sans-serif;">
      <span style="color:#00ff99;">CID:</span> ${cid} · <span style="color:#00ff99;">${tr.role}:</span> ${role} · ${tr.cidStatus}
    </div>
  `;

  window.voteDAO = function () {
    alert(`${tr.support} ✔️`);
    // Тут можна додати логіку голосування, POST-запит або інтеграцію з DAO-контрактом
  };
})();
