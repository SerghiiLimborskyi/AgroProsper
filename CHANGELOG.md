# 📜 CHANGELOG

Усі суттєві зміни цього проєкту документуються в цьому файлі.

Формат базується на [Keep a Changelog](https://keepachangelog.com/uk/1.0.0/),  
і проєкт дотримується [Semantic Versioning](https://semver.org/lang/uk/).

## [Unreleased]
### Додано
- 🔍 Підтримка автоматичної генерації `sitemap.xml`
- 🛡️ Інтеграція CodeQL та Secrets Check
- 📦 GitHub Action для релізів із тегами

### Змінено
- ⚙️ Обʼєднано скрипти генерації `.json` та `.xml` в один файл

### Виправлено
- 🧹 Очищено структуру репозиторію
- ✅ Виправлено помилку з некоректним шляхом у `robots.txt`

---

## [1.0.0] – 2025-06-27
### Додано
- 🌱 Початковий реліз AgroProsper
- 🗺️ Генерація `site-map.json`
- 📄 README з бейджами CI/CD
- 🌍 Деплой на GitHub Pages

# 📜 AgroProsper DAO – CHANGELOG

Документує всі ключові зміни, повʼязані з безпекою, очищенням коду, інтеграціями, багатомовністю та виправленнями смарт-контрактів DAO.

---

## [v2.0] – 2025-07-09

### 🔧 Очистка WebApp

- Видалено DOM-заглушку (`form-handler.js`)
- Додано `truth-alert()` з багатомовною підтримкою
- Встановлено новий `index.html` із перевіркою сабмітів

### 🌍 Багатомовність

- Створено `lang-utils.js` з auto-detect і локалями
- Додано словники `ua.json`, `pl.json`, `en.json` (30+ фраз)
- Виведено перемикач мов на сайті

### 🎮 Telegram WebApp

- Адаптовано `telegram-notifier.js` для каналів UA / PL
- Початковий запуск гри AgroTycoon (preview)

### 🎬 Презентація

- Додано відео у `promo/index.html` + фрейм YouTube
- PDF-гайд `agroprosper-presentation-full.pdf` доступний для поширення

---

## [v1.0] – 2025-06-30

- Ініціалізація DAO WebApp
- Створено `AgroChamp.sol` (SBT контракт для адміністраторів)
- Публікація `README.md`, `SECURITY.md`
