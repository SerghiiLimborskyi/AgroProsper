(function () {
  const lang = navigator.language.slice(0, 2);
  const translations = {
    uk: {
      home: "🏠 Головна",
      about: "🧠 Про нас",
      quests: "🎮 Квести",
      video: "🎬 Відео",
      badges: "🏅 Бейджі",
      contact: "📬 Контакти",
      support: "🤝 Підтримати",
      login: "🔐 Вхід",
      gov: "📊 GOV-слайди",
      accessDenied: "🔐 Доступ лише після реєстрації. Увійдіть через DAO-панель."
    },
    en: {
      home: "🏠 Home",
      about: "🧠 About",
      quests: "🎮 Quests",
      video: "🎬 Video",
      badges: "🏅 Badges",
      contact: "📬 Contact",
      support: "🤝 Support",
      login: "🔐 Login",
      gov: "📊 GOV Slides",
      accessDenied: "🔐 Access restricted. Please register via DAO panel."
    },
    pl: {
      home: "🏠 Strona główna",
      about: "🧠 O nas",
      quests: "🎮 Misje",
      video: "🎬 Wideo",
      badges: "🏅 Odznaki",
      contact: "📬 Kontakt",
      support: "🤝 Wsparcie",
      login: "🔐 Logowanie",
      gov: "📊 Slajdy GOV",
      accessDenied: "🔐 Dostęp tylko po rejestracji. Przejdź do panelu DAO."
    }
  };

  const t = translations[lang] || translations.uk;

  const nav = document.createElement("nav");
  nav.style = "background: rgba(0,0,0,0.8); padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-family: 'Segoe UI', sans-serif;";
  nav.innerHTML = `
  const toggle = document.querySelector(".menu-toggle");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

    <div>
      <img src="../public/logo.png" alt="AgroProsper Logo" style="height:40px; vertical-align: middle;" />
      <span style="color:#00ffcc; font-weight:bold; margin-left:10px;">AgroProsper V7</span>
    </div>
    <div>
      <a href="../index.html" style="color:white; margin:0 10px;">${t.home}</a>
      <a href="../about.html" style="color:white; margin:0 10px;">${t.about}</a>
      <a href="../quests.html" style="color:white; margin:0 10px;" onclick="checkAccess(event)">${t.quests}</a>
      <a href="../video.html" style="color:white; margin:0 10px;">${t.video}</a>
      <a href="../badges.html" style="color:white; margin:0 10px;">${t.badges}</a>
      <a href="../contact.html" style="color:white; margin:0 10px;">${t.contact}</a>
      <a href="../support.html" style="color:white; margin:0 10px;" onclick="checkAccess(event)">${t.support}</a>
      <a href="../Registration/dashboard.html" style="color:#00ffcc; margin:0 10px;">${t.login}</a>
      <a href="../slide5.html" style="color:white; margin:0 10px;" onclick="checkAccess(event)">${t.gov}</a>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
  fetch("menu.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("menu").innerHTML = html;
  });
  
document.addEventListener("DOMContentLoaded", () => {
  const cid = localStorage.getItem("cid") || "0x000";
  const role = localStorage.getItem("agentLevel") || "Starter";
  document.getElementById("cidRole").textContent = `CID: ${cid} (${role})`;
});

  window.checkAccess = function (e) {
    const cid = localStorage.getItem("cid");
    if (!cid) {
      e.preventDefault();
      alert(t.accessDenied);
    }
  };
})();
