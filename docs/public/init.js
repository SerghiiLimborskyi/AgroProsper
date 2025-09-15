(function () {
  const depth = location.pathname.split('/').length - 2;
  const prefix = '../'.repeat(depth);

  const lang = navigator.language.startsWith("pl") ? "pl"
              : navigator.language.startsWith("en") ? "en"
              : "uk";

  const translations = {
    uk: {
      title: "AgroProsper DAO",
      home: "🏠 Головна",
      sections: "🧩 DAO-розділи",
      agent: "🧠 Панель агента",
      quest: "🎮 Квести",
      studio: "🎨 DAO Студія",
      video: "🎬 Відео-звернення",
      contact: "📬 Контакти",
      cid: "CID:",
      role: "🧠 Агент"
    },
    pl: {
      title: "AgroProsper DAO",
      home: "🏠 Strona główna",
      sections: "🧩 Moduły DAO",
      agent: "🧠 Panel agenta",
      quest: "🎮 Misje",
      studio: "🎨 Studio DAO",
      video: "🎬 Wideo",
      contact: "📬 Kontakt",
      cid: "CID:",
      role: "🧠 Agent"
    },
    en: {
      title: "AgroProsper DAO",
      home: "🏠 Home",
      sections: "🧩 DAO Sections",
      agent: "🧠 Agent Panel",
      quest: "🎮 Quests",
      studio: "🎨 DAO Studio",
      video: "🎬 Video Message",
      contact: "📬 Contact",
      cid: "CID:",
      role: "🧠 Agent"
    }
  };

  const insert = (id, file, callback) => {
    const target = document.getElementById(id);
    if (target) {
      fetch(prefix + file)
        .then(res => res.text())
        .then(html => {
          target.innerHTML = html;
          if (typeof callback === "function") callback();
        })
        .catch(err => {
          console.error(`Не вдалося завантажити ${file}:`, err);
        });
    }
  };

  insert("menuContainer", "menu.html", () => {
    const t = translations[lang];
    const map = {
      menuTitle: t.title,
      menuHome: t.home,
      menuSections: t.sections,
      menuAgent: t.agent,
      menuQuest: t.quest,
      menuStudio: t.studio,
      menuVideo: t.video,
      menuContact: t.contact,
      cidLabel: t.cid,
      roleBadge: t.role
    };
    for (const id in map) {
      const el = document.getElementById(id);
      if (el) el.textContent = map[id];
    }
  });

  insert("footerContainer", "footer.html");
})();
