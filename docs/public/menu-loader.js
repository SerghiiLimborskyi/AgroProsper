(function () {
  const depth = location.pathname.split('/').length - 2;
  const prefix = '../'.repeat(depth);
  const target = document.getElementById('menuContainer');

  if (target) {
    fetch(prefix + 'menu.html')
      .then(res => res.text())
      .then(html => {
        target.innerHTML = html;

        // Після вставки меню — активуємо логіку гамбургера
        const toggle = target.querySelector(".menu-toggle");
        const nav = target.querySelector(".menu-list");

        if (toggle && nav) {
          toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
          });
        }
      })
      .catch(err => {
        console.error('Не вдалося завантажити menu.html:', err);
      });
  }
})();
