
---

## 🇬🇧 README.en.md — English version

```markdown
# 🌾 AgroProsper DAO

**AgroProsper** is an automated AI platform for agribusiness, built on DAO architecture with support for NFT, AI, multilingual interface, gamification, and interactive presentations.

## 🧠 Core Modules

| Module        | Description                                        |
|---------------|----------------------------------------------------|
| 🤖 AI Bot      | Chatbot for consulting, sales, and support         |
| 💰 Finance     | Financial monitoring, tokenization, DAO payments   |
| 📈 Sales       | Automated DAO dashboards for farmers               |
| 📣 Promo       | Video presentations, subtitles, QR codes           |
| 🎮 Gamification| DAO games, NFT-based motivation                    |
| 🌍 Multilang   | Supports 🇺🇦 🇬🇧 🇵🇱 languages                        |

## 🪙 AgroToken (AGT)

- Type: ERC-20  
- Initial supply: 1,000,000 AGT  
- Purpose: DAO voting, service payments, bonuses  
- Contract: `0x...` (to be added after deployment)

## 🔄 NFT Badge CID Updates

The `updateAll.js` script automatically updates NFT metadata (`starter.json`, `farmer.json`, `trader.json`) via Web3.Storage.

**Structure:**
- `scripts/updateAll.js` — updates all CIDs
- `.env` — stores `WEB3STORAGE_TOKEN`
- `UserBadgeNFT.sol` — includes `updateCID(badgeType, cid)` function

## 🎨 Interface Styling

- Styles moved to `public/style.css`
- Linked via:
  ```html
  <link rel="stylesheet" href="public/style.css">
