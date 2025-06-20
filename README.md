# 🌱 AgroProsper – Інновації для агробізнесу

**AgroProsper** – це автоматизована AI-платформа, що допомагає фермерам аналізувати ринок, оптимізувати продажі та контролювати фінанси.

## 🚜 Функціональність
✅ **Чат-бот** – AI-помічник для консультацій фермерів  
✅ **Автоматичні продажі** – інтеграція з аграрними біржами  
✅ **Моніторинг фінансів** – AI-аналіз доходів та витрат  
✅ **Рекламний менеджер** – автоматичне розміщення реклами  

## 📡 API-інтеграції
- [Commodity Price API](https://api-ninjas.com/api/commodityprice) – отримання актуальних цін  
- [Meta API](https://developers.facebook.com/) – автоматизація публікацій у соцмережах  
- [FinTech API](https://www.fintech.com/) – контроль фінансів  

## 🔧 Як встановити?
1. Клонуйте репозиторій:  
   ```sh
   git clone https://github.com/SerghiiLimborskyi/AgroProsper.git
![Site status](https://img.shields.io/badge/AgroProsper--Site-%E2%9C%85-brightgreen?style=flat&logo=githubpages)
[![Site Status](https://img.shields.io/badge/Live%20Site-%E2%9C%85-success?logo=githubpages)](https://serghiilimborskyi.github.io/AgroProsper/)
[![🟢 Live](https://img.shields.io/badge/Site--Status-Online-brightgreen?logo=githubpages)](https://serghiilimborskyi.github.io/AgroProsper)
[![🟢 Site Status](https://img.shields.io/badge/Site--Status-Online-brightgreen?logo=githubpages)](https://serghiilimborskyi.github.io/AgroProsper)
zip -r agroprosper-live.zip index.html vercel.json README.md
# 🌿 AgroToken (AGT)

An ERC-20 token for the AgroProsper AI platform.

- Contract: `AgroToken.sol`
- Symbol: `AGT`
- Initial Supply: `1,000,000 AGT`

## 🚀 Quickstart
📽 [🎥 Дивитись відео презентацію](https://yourusername.github.io/AgroProsper/promo/)

[🎁 Отримати SBT бейдж](./promo/drop.html)
# 🎖 AgroBadge SBT Collection (1–10)

🎉 AgroProsper v1.0 • DAO-ready публікація

Цей дистрибутив містить повний набір файлів, які сформували першу фазу запуску:

- 🌿 Презентація AgroToken
- 🎁 Soulbound Token-дроп з 10 унікальними бейджами
- 📦 Media Kit для пітчів і партнерів
- 🤝 Сторінка партнери DAO-комʼюніті

🛡️ Дроп зашифровано, токени видано через зачинений маршрут.

Created with 💚 by Copilot + Serhii
## 🌍 Презентація AgroProsper (багатомовна)

AgroProsper підтримує автоматичне перенаправлення залежно від мови браузера користувача (ua / en / pl).

> Перейти до презентації:

<p align="center">
  <a href="https://serghiilimborskyi.github.io/AgroProsper/" target="_blank">
    <img src="https://img.shields.io/badge/🎥%20Відкрити%20презентацію-AgroProsper-green?style=for-the-badge" alt="Відкрити презентацію" />
  </a>
</p>

---

### 🧭 Детекція мови

- `uk/` — українська  
- `en/` — англійська  
- `pl/` — польська  

Автоматичне перенаправлення через `promo/index.html`:

```html
<script>
  const lang = navigator.language.slice(0, 2);
  const target = ['en', 'pl'].includes(lang) ? lang : 'uk';
  location.href = `./${target}/`;
</script>



