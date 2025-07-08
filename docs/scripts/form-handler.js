document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector("textarea").value.trim();

      if (!name || !email || !message) {
        alert("Будь ласка, заповніть усі поля!");
        return;
      }

      alert(`✅ Дякуємо, ${name}! Ваше повідомлення надіслано.`);
      form.reset();
    });
  }
});
