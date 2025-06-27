# ⚙️ Технічна специфікація – AgroProsper v1.0

> Версія: v1.0  
> Дата: 2025-06-27  
> Автор: Сергій Лімборський

## 1. Опис проєкту
AgroProsper — це AI-платформа, що надає цифрові послуги фермерам через інтерфейс веб-додатку, NFT-бейджі та API інтеграції.

## 2. Архітектура
- **Фронтенд**: HTML/CSS/JS (без фреймворків)
- **CI/CD**: GitHub Actions (`release.yml`, `update-release-notes.yml`)
- **Деплоймент**: GitHub Pages
- **AI-інтеграція**: Microsoft Copilot Assistant
- **SBT/NFT**: SVG/JSON з підтримкою IPFS

## 3. Автоматизації
- Генерація `sitemap.xml`, `robots.txt`
- Автозбірка `.zip` для релізів
- Автоматичне оновлення changelog, release-notes

## 4. Безпека
- 🔐 CodeQL
- 🕵️ Secrets Scan
- ✅ Публічні релізи, без приватних токенів

## 5. API / Інтеграції
- 🔗 Commodity Price API
- 🔗 FinTech API (wallets, доходи, збут)
- 🔗 Social Media API (публікації)

## 6. Релізні артефакти
- `top-farmer-ipfs-kit.zip`
- `metadata-inline.json`
- `agroprosper-live.zip`

## 7. Статус
> Стабільна версія з підтримкою DAO / SBT  
> Код: відкритий, структура масштабована
