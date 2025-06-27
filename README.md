# 🌱 AgroProsper – Інновації для агробізнесу

![Site Map Generator](https://github.com/SerghiiLimborskyi/AgroProsper/actions/workflows/update-site-map.yml/badge.svg)

**AgroProsper** – це автоматизована AI-платформа, що допомагає фермерам аналізувати ринок, оптимізувати продажі та контролювати фінанси.

## 🚦 CI/CD Status

## 🌍 Live Deployment

## 📦 Release Assets

🔗 Останній реліз: [AgroProsper v1.0 – DAO-ready](https://github.com/SerghiiLimborskyi/AgroProsper/releases/latest)

⬇️ **Що включає:**
- `agroprosper-live.zip` — HTML+JS збірка для швидкого розгортання
- `top-farmer-ipfs-kit.zip` — ZIP-архів з метаданими та графікою для SBT
- `metadata-inline.json` — ERC-721 метадані з вбудованим base64 зображенням
- `top-farmer.svg` — окрема векторна версія бейджа

👉 Перейти до сайту: [AgroProsper на GitHub Pages](https://serghiilimborskyi.github.io/AgroProsper/)

🗺️ Карта сайту: [sitemap.xml](https://serghiilimborskyi.github.io/AgroProsper/sitemap.xml)  
🤖 robots.txt: [robots.txt](https://serghiilimborskyi.github.io/AgroProsper/robots.txt)

| Перевірка                  | Статус                                                                                                                                         |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| 🗺️ Site Map Generator      | ![Site Map Generator](https://github.com/SerghiiLimborskyi/AgroProsper/actions/workflows/update-site-map.yml/badge.svg)                     |
| 🛡️ CodeQL Security Scan    | ![CodeQL](https://github.com/SerghiiLimborskyi/AgroProsper/actions/workflows/codeql.yml/badge.svg)                                           |
| 🔐 Secrets Check           | ![Secrets Check](https://github.com/SerghiiLimborskyi/AgroProsper/actions/workflows/secrets-check.yml/badge.svg)                             |

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

<p align="center">
  <a href="https://serghiilimborskyi.github.io/AgroProsper/promo/sbt/mint.html" target="_blank">
    <img src="media-kit/sbt/QR-mint-top-farmer.png" alt="Mint Top Farmer QR" width="220" />
  </a>
</p>

> Scan the QR to mint your soulbound Top Farmer badge (SBT) after playing AgroTycoon 🌿

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
### 🪪 Claim your Top Farmer SBT

<p align="center">
  <a href="https://serghiilimborskyi.github.io/AgroProsper/promo/sbt/mint.html" target="_blank">
    <img src="media-kit/sbt/QR-mint-top-farmer.png" alt="Mint Top Farmer QR" width="220" />
  </a>
</p>

> Scan the QR to mint your soulbound Top Farmer badge (SBT) after playing AgroTycoon 🌿

# 🏅 Top Farmer IPFS Kit

Ця папка містить усі необхідні файли для публікації SBT (soulbound token)-бейджа фермеру AgroTycoon DAO. Мета — забезпечити швидке завантаження метаданих та графіки на IPFS і подальше використання у `mint.html`.

## 📦 Вміст

| Файл                   | Призначення                                                         |
|------------------------|----------------------------------------------------------------------|
| `metadata-inline.json` | JSON-метадані у форматі ERC-721 з вбудованим base64-зображенням      |
| `top-farmer.svg`       | Окрема графіка бейджа (візуально той самий бейдж SVG)                 |
| `top-farmer-ipfs-kit.zip` | ZIP-архів із обома файлами (зручно для поширення або IPFS-завантаження) |

## ☁️ Завантаження на IPFS

Можна завантажити як окремі файли (`metadata-inline.json`) або повним архівом (`.zip`) на:

- [https://nft.storage](https://nft.storage)
- [https://web3.storage](https://web3.storage)

Після завантаження ви отримаєте `CID`, який використовується як `tokenURI` в `mint.html`.

## 🧩 Як вставити `tokenURI`

У файлі `promo/sbt/mint.html` замініть рядок:

```js
const tokenURI = "ipfs://<твій_CID>/metadata-inline.json";

git add README.md
git commit -m "📛 Додано статус-бейдж для GitHub Action"
git push

![CodeQL](https://github.com/SerghiiLimborskyi/AgroProsper/actions/workflows/codeql.yml/badge.svg)
![Secrets Check](https://github.com/SerghiiLimborskyi/AgroProsper/actions/workflows/secrets-check.yml/badge.svg)
