# 🛡️ Admin-Kit для AgroProsper

Модуль безпеки та автоматизації, що додає:
- Захищене API на Express
- Генерацію токенів
- CI-авторизацію
- Панель керування токенами
- Аналіз витоків секретів

---

## 📁 Структура


---

## 🚀 Швидкий старт

```bash
bash install-admin-kit.sh
npm install express dotenv
node scripts/generate-token.js
node backend/index.js
curl -X POST http://localhost:3001/api/secure-endpoint \
-H "Authorization: Bearer ваш_токен"
node scripts/scan-secrets.js
