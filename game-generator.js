const fs = require('fs');
const path = require('path');

function generateGame({ title, genre, setting, mechanic, reward }) {
  const html = `
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <title>🎮 ${title}</title>
  <link rel="stylesheet" href="../style.css" />
</head>
<body>
  <div id="game-container">
    <h1>${title}</h1>
    <p><strong>Жанр:</strong> ${genre}</p>
    <p><strong>Сеттінг:</strong> ${setting}</p>
    <p><strong>Механіка:</strong> ${mechanic}</p>
    <p><strong>Нагорода:</strong> ${reward}</p>
    <button onclick="startGame()">🚀 Почати гру</button>
    <div id="game-output" style="margin-top: 20px;"></div>
  </div>

  <script>
    function startGame() {
      document.getElementById('game-output').innerHTML = \`
        <p>🔍 Ви починаєте DAO-пригоду в світі <strong>${setting}</strong>.</p>
        <p>🎯 Завдання: ${mechanic}</p>
        <p>🏆 Успішне завершення — ${reward}</p>
      \`;
    }
  </script>
</body>
</html>
  `;

  const filename = title.toLowerCase().replace(/\s+/g, '-') + '.html';
  const filepath = path.join(__dirname, '../games/', filename);
  fs.writeFileSync(filepath, html);
  console.log(`✅ Гру "${title}" згенеровано: ${filename}`);
}

// 🔁 Приклад виклику:
generateGame({
  title: 'DAO of Crops',
  genre: 'Стратегія',
  setting: 'фермерський ринок DAO',
  mechanic: 'керуй посівами, продавай врожай, отримуй бейджі',
  reward: 'NFT-бейдж “Top Farmer”'
});
