document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // 💾 Фіксуємо активацію форми
    console.log("📨 Надіслано форму:");
    console.log("Ім’я:", name);
    console.log("Email:", email);
    console.log("Повідомлення:", message);

    // 🤖 Антиспам: базова перевірка
    if (!name || !email || !message) {
      alert("⚠️ Усі поля обов’язкові для заповнення!");
      return;
    }
    if (!email.includes("@")) {
      alert("📛 Email має містити символ '@'");
      return;
    }

    // ✅ Успішне надсилання
    alert("💚 Дякуємо за співпрацю! Користуйтесь самі — тепер сайт ваш.");
    form.reset();
  });
});
