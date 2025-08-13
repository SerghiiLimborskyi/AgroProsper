// transitionTracker.js
// Відстеження переходів через рекламні посилання AgroProsper

// Симуляція локального DAO-реєстру
const daoRegistry = [];

// Функція для створення анонімного fingerprint
function getFingerprint() {
  return `${navigator.language}-${navigator.platform}-${navigator.userAgent.slice(0, 20)}`;
}

// Основна функція трекінгу
function trackReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const refTag = urlParams.get('ref');

  if (refTag === 'agroprosper') {
    const timestamp = new Date().toISOString();
    const fingerprint = getFingerprint();

    const entry = {
      timestamp,
      refTag,
      fingerprint
    };

    // Зберігаємо в локальний масив (можна замінити на DAO-запис)
    daoRegistry.push(entry);

    console.log('✅ Перехід зафіксовано:', entry);

    // TODO: Надіслати на сервер або DAO-контракт
    // fetch('/api/track', { method: 'POST', body: JSON.stringify(entry) })
  }
}

// Запуск після завантаження сторінки
window.addEventListener('load', trackReferral);
