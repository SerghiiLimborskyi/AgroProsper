# 📦 AgroProsper – Історія змін

---

## 🔖 v1.0 — Admin-Kit Release

🗓 Дата випуску: 18 червня 2025  
👤 Автор: Сергій Лімборський

### ✅ Додано
- `admin-kit/backend/index.js`: Захищене Express API з авторизацією через `BOT_SECRET_KEY`
- `scripts/generate-token.js`: Генерація та автоматичне збереження токена у `.env`
- `scripts/scan-secrets.js`: Сканер відкритих секретів у проєкті
- `admin.html`: Адмін-панель для створення токенів із браузера
- `auth-check.yml`: CI-авторизація GitHub з перевіркою `BOT_SECRET_KEY`
- `install-admin-kit.sh`: Автоматична ініціалізація структури `admin-kit/`
- `.env.example`, `.gitignore`: Шаблони для захисту чутливих даних
- `README.md`: Повна документація admin-kit

### 🔐 Особливості
- ✔️ Захист API-запитів
- 🔁 Генерація токенів із браузера або термінала
- 🔎 CI-нагляд над секретами
- 🧩 Структура готова до деплою в Railway, Vercel або локально
