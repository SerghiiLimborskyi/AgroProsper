(function () {
  const depth = location.pathname.split('/').length - 2;
  const prefix = '../'.repeat(depth);
  const target = document.getElementById('menuContainer');

  if (target) {
    fetch(prefix + 'menu.html')
      .then(res => res.text())
      .then(html => {
        target.innerHTML = html;

        // Гамбургер
        const toggle = target.querySelector(".menu-toggle");
        const nav = target.querySelector(".menu-list");
        if (toggle && nav) {
          toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
          });
        }

        // CID і роль
        const cidValue = target.querySelector(".cid-value");
        const roleBadge = target.querySelector(".role-badge");
        if (cidValue && roleBadge) {
          const cid = localStorage.getItem("userCID") || "0xA1F3...D9B";
          const role = localStorage.getItem("userRole") || "Агент";
          cidValue.textContent = cid;
          roleBadge.textContent = `🧠 ${role}`;
        }

        // Активний пункт
        const links = target.querySelectorAll(".menu-list li a");
        links.forEach(link => {
          if (link.href.includes(location.pathname.split('/').pop())) {
            link.classList.add("active-link");
          }
        });
      })
      .catch(err => {
        console.error('❌ Не вдалося завантажити menu.html:', err);
      });
  }
})();
