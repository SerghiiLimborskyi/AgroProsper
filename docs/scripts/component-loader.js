function loadComponent(name) {
  fetch(`components/${name}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("daoContent").innerHTML += html;
    });
}

// 🔃 Завантажити потрібні компоненти
loadComponent("cid-login");
loadComponent("agent-panel");
loadComponent("quest-scene");
loadComponent("dao-studio");
