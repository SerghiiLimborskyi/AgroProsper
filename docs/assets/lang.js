document.addEventListener("DOMContentLoaded", function () {
  const langButtons = document.querySelectorAll("footer p");
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("🔧 Перемикач мов ще не реалізовано.");
    });
  });
});
