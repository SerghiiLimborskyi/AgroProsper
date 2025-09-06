// 📦 Service Worker реєстрація
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('dao-sw.js')
    .then(reg => console.log('✅ DAO SW зареєстровано:', reg.scope))
    .catch(err => console.error('❌ Помилка SW:', err));
}

// 📱 Встановлення PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('installApp');
  if (installBtn) installBtn.style.display = 'block';
});

function installDAOApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('📲 DAO App встановлено');
      } else {
        console.log('🚫 Встановлення скасовано');
      }
      deferredPrompt = null;
    });
  }
}
