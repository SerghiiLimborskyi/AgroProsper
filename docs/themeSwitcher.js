// themeSwitcher.js — простий перемикач теми для AgroProsper

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("theme", themeName);
}

// Автоматичне застосування збереженої теми при завантаженні
(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
})();
