// 🌾 AgroPromoEngine.js — етична реклама AgroProsper DAO

// 🔐 Перевірка реєстрації
function isRegisteredUser() {
  const cid = localStorage.getItem("userCID");
  const email = localStorage.getItem("userEmail");
  return Boolean(cid && email);
}

// 💰 Перевірка доступності знижки (імітація логіки)
function checkDiscountEligibility() {
  // У реальному випадку — запит до DAO або API
  const random = Math.random();
  return random > 0.5; // 50% шанс на знижку
}

// 🎁 Підтримка без суми — сюрприз
function activateSupportFlow() {
  const supportMessage = `
    🎁 AgroProsper надає фінансову підтримку через DAO-фонд.
    Ви отримаєте сюрприз — етичну допомогу, яка не вимірюється цифрами.
  `;
  renderPromoMessage(supportMessage);
}

// 🎉 Знижка для зареєстрованого користувача
function activateDiscountFlow() {
  const discountMessage = `
    🎉 Ви отримали знижку як зареєстрований учасник AgroProsper DAO!
  `;
  renderPromoMessage(discountMessage);
}

// 🔒 Повідомлення про необхідність реєстрації
function showRegistrationPrompt() {
  const promptMessage = `
    🔒 Будь ласка, зареєструйтесь, щоб отримати підтримку або знижку від AgroProsper.
  `;
  renderPromoMessage(promptMessage);
}

// 📦 Вивід повідомлення в DOM
function renderPromoMessage(message) {
  const container = document.getElementById("promoResult");
  if (container) {
    container.textContent = message;
    container.classList.add("active");
  } else {
    console.warn("❗ Контейнер #promoResult не знайдено.");
  }
}

// 🚀 Запуск логіки після завантаження сторінки
function runPromoEngine() {
  if (!isRegisteredUser()) {
    showRegistrationPrompt();
    return;
  }

  if (checkDiscountEligibility()) {
    activateDiscountFlow();
  } else {
    activateSupportFlow();
  }
}

// ⏳ Автоматичний запуск
window.addEventListener("DOMContentLoaded", runPromoEngine);
