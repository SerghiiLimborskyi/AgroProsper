const axios = require('axios');
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function notifySecurityAlert(file, line) {
  const message = `⚠️ Token detected in ${file}\n🔐 Line: ${line}`;
  axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message
  });
}
node admin-kit/automation/telegram-notifier.js

document.getElementById('start-btn').addEventListener('click', startGame);

let score = 0;
let stage = 0;

const stages = [
  {
    title: '🌱 Сцена 1: Почни ферму',
    question: 'Що ви оберете для старту?',
    options: [
      { text: '🚜 Купити техніку', value: 2 },
      { text: '🚁 Арендувати дрон', value: 3 },
      { text: '🌿 Біодобрива', value: 4 }
    ]
  },
  {
    title: '⚖️ Сцена 2: Етичне рішення',
    question: 'Інспектор просить “подарунок”. Що робити?',
    options: [
      { text: '💸 Дати хабар', value: -2 },
      { text: '📘 Дотриматись етики DAO', value: 5 }
    ]
  },
  {
    title: '🗳️ Сцена 3: Голосування в DAO',
    question: 'Куди інвестувати DAO-кошт?',
    options: [
      { text: '🏫 Освіта фермерів', value: 4 },
      { text: '🌍 Купити землю', value: 2 },
      { text: '📣 Реклама', value: 1 }
    ]
  }
];

function startGame() {
  document.getElementById('start-btn').style.display = 'none';
  showStage();
}

function showStage() {
  const container = document.getElementById('game-stage');
  container.innerHTML = '';
  container.style.display = 'block';

  const current = stages[stage];
  const title = document.createElement('h2');
  title.textContent = current.title;

  const question = document.createElement('p');
  question.textContent = current.question;

  container.appendChild(title);
  container.appendChild(question);

  current.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.text;
    btn.onclick = () => {
      score += opt.value;
      stage++;
      if (stage < stages.length) {
        showStage();
      } else {
        showResult();
      }
    };
    container.appendChild(btn);
  });
}

function showResult() {
  document.getElementById('game-stage').style.display = 'none';
  const result = document.getElementById('result-screen');
  result.style.display = 'block';

  const scoreText = document.getElementById('score-text');
  scoreText.textContent = `Ваш AgroScore: ${score} балів`;

  const mintLink = document.getElementById('mint-link');
  mintLink.href = `https://agroprosper.link/mint.html?score=${score}`;
}

npx dotenv-vault encrypt

const messagePromo = `
🎬 AgroProsper DAO • Презентація

👀 Переглянути відео: https://serghiilimborskyi.github.io/AgroProsper/promo/
📄 PDF презентація: AgroProsper DAO Pitch (UA/PL/EN)
📦 Завантажити: promo-localized.zip
💬 Telegram Bot: @AgroProsperBot
💚 Розумні фермери, децентралізовані рішення.
`;

bot.sendMessage(chatId, messagePromo);

if (text === '!promo') {
  bot.sendMessage(chatId, '🎬 AgroProsper DAO — презентація запущена!', {
    reply_markup: {
      inline_keyboard: [[
        { text: '📺 Відео', web_app: { url: 'https://serghiilimborskyi.github.io/AgroProsper/promo/' } },
        { text: '📄 PDF', url: 'https://github.com/SerghiiLimborskyi/AgroProsper/releases/latest/download/agroprosper-presentation-full.pdf' }
      ]]
    }
  });
}

bot.sendMessage(chatId, '🎬 Презентація AgroProsper DAO готова!', {
  reply_markup: {
    inline_keyboard: [[
      {
        text: '📺 Відкрити презентацію',
        web_app: { url: 'https://serghiilimborskyi.github.io/AgroProsper/promo/' }
      }
    ]]
  }
});

bot.sendMessage(chatId, '💚 AgroProsper – обери дію:', {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '📺 Відео презентація',
          web_app: { url: 'https://serghiilimborskyi.github.io/AgroProsper/promo/' }
        }
      ],
      [
        {
          text: '📄 PDF гайд',
          url: 'https://github.com/SerghiiLimborskyi/AgroProsper/releases/latest/download/agroprosper-presentation-full.pdf'
        }
      ],
      [
        {
          text: '🎮 Грати в AgroTycoon',
          web_app: { url: 'https://serghiilimborskyi.github.io/AgroProsper/promo/game/agrotycoon.html' }
        }
      ]
    ]
  }
});
if (command === "/dao_graphics") {
  bot.sendMessage(chatId, "🎨 DAO Studio 2025 доступна:\n📦 studio-kit.zip\n🔗 IPFS: ipfs://bafybeidaostudio/studio-kit.zip");
}
