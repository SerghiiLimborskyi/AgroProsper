
---

## 🇵🇱 README.pl.md — Polska wersja

```markdown
# 🌾 AgroProsper DAO

**AgroProsper** to zautomatyzowana platforma AI dla agrobiznesu, oparta na architekturze DAO z obsługą NFT, AI, wielu języków, grywalizacji i interaktywnych prezentacji.

## 🧠 Główne moduły

| Moduł         | Opis                                               |
|---------------|----------------------------------------------------|
| 🤖 Bot AI      | Chatbot do konsultacji, sprzedaży i wsparcia       |
| 💰 Finanse     | Monitorowanie finansów, tokenizacja, płatności DAO |
| 📈 Sprzedaż    | Zautomatyzowane panele DAO dla rolników            |
| 📣 Promocja    | Prezentacje wideo, napisy, kody QR                 |
| 🎮 Grywalizacja| Gry DAO, motywacja przez NFT                       |
| 🌍 Multilang   | Obsługa 🇺🇦 🇬🇧 🇵🇱 języków                           |

## 🪙 AgroToken (AGT)

- Typ: ERC-20  
- Początkowa emisja: 1,000,000 AGT  
- Przeznaczenie: głosowanie DAO, płatności, bonusy  
- Kontrakt: `0x...` (dodany po wdrożeniu)

## 🔄 Aktualizacja CID dla NFT

Skrypt `updateAll.js` automatycznie aktualizuje metadane NFT (`starter.json`, `farmer.json`, `trader.json`) przez Web3.Storage.

**Struktura:**
- `scripts/updateAll.js` — aktualizuje wszystkie CID
- `.env` — przechowuje `WEB3STORAGE_TOKEN`
- `UserBadgeNFT.sol` — zawiera funkcję `updateCID(badgeType, cid)`

## 🎨 Stylizacja interfejsu

- Style przeniesione do `public/style.css`
- Podłączone przez:
  ```html
  <link rel="stylesheet" href="public/style.css">
