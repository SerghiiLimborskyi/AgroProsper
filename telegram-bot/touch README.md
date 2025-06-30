git clone https://github.com/SerghiiLimborskyi/AgroProsper.git
cd AgroProsper/bot
npm install
cp .env.example .env
node telegram-bot.js

BOT_TOKEN=123456789:ABC...         # Токен від @BotFather
AIRTABLE_API_KEY=keyXXXXXXXXXXXX   # API ключ Airtable
AIRTABLE_BASE_ID=appXXXXXXXXXXXX   # ID бази DAO Logs
LOG_WEBHOOK=https://your-log-endpoint.com

📦 bot/
├── telegram-bot.js         # Основна логіка бота
├── airtable-logs.js        # Логування в Airtable
├── throttle.js             # Адаптивне обмеження запитів
├── sbt-check.js            # Перевірка SBT у гаманці
├── data/
│   └── ads.json            # Рекламна карта по регіонах
├── docs/
│   ├── manifest.pdf
│   ├── ethics.pdf
│   └── license.pdf
└── .env.example

GET /sbt-check?wallet=0x123...
→ { hasSBT: true }
