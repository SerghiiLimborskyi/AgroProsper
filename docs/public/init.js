(function () {
  const depth = location.pathname.split('/').length - 2;
  const prefix = '../'.repeat(depth);

  const insert = (id, file) => {
    const target = document.getElementById(id);
    if (target) {
      fetch(prefix + file)
        .then(res => res.text())
        .then(html => {
          target.innerHTML = html;
        })
        .catch(err => {
          console.error(`Не вдалося завантажити ${file}:`, err);
        });
    }
  };

  insert('menu', 'menu.html');
  insert('footer', 'footer.html');
})();
