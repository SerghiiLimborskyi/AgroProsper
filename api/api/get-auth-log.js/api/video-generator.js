const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function generateVideo({ title, script, images, music, output }) {
  const slides = images.map((img, i) => `file '${img}'\nduration 4`).join('\n');
  const listPath = path.join(__dirname, 'slides.txt');
  fs.writeFileSync(listPath, slides + `\nfile '${images[images.length - 1]}'`);

  const audioPath = path.join(__dirname, music);
  const outputPath = path.join(__dirname, output);

  const cmd = `ffmpeg -y -f concat -safe 0 -i slides.txt -i "${audioPath}" -c:v libx264 -c:a aac -shortest "${outputPath}"`;

  exec(cmd, (err) => {
    if (err) return console.error('❌ Помилка генерації відео:', err);
    console.log(`✅ Відео "${title}" згенеровано: ${output}`);
  });
}

// 🔁 Приклад виклику:
generateVideo({
  title: 'DAO of Crops — Презентація',
  script: 'Це AgroProsper. DAO, де гра — це звіт, а звіт — це перемога.',
  images: [
    './slides/intro.jpg',
    './slides/game.jpg',
    './slides/chart.jpg',
    './slides/nft.jpg',
    './slides/outro.jpg'
  ],
  music: 'music/ambient.mp3',
  output: 'exports/dao-promo.mp4'
});
