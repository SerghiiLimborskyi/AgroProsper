(function () {
  const depth = location.pathname.split('/').length - 2;
  const prefix = '../'.repeat(depth);
  const target = document.getElementById('menu');

  if (target) {
    fetch(prefix + 'menu.html')
      .then(res => res.text())
      .then(html => {
        target.innerHTML = html;
      })
      .catch(err => {
        console.error('Не вдалося завантажити menu.html:', err);
      });
  }
})();
