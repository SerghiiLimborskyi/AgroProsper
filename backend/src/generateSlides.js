import fs from 'fs';
import path from 'path';

const slides = [
  { title: 'AgroProsper', content: 'Розумне фермерство для України' },
  { title: 'Мета', content: 'Підвищити врожайність та прозорість' },
  { title: 'Рішення', content: 'Блокчейн + AI + супутникові дані' }
];

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Слайди</title>
  <style>
    body { font-family: sans-serif; padding: 2em; }
    .slide { margin-bottom: 3em; }
    h2 { color: #2c3e50; }
  </style>
</head>
<body>
  ${slides.map(s => `<div class="slide"><h2>${s.title}</h2><p>${s.content}</p></div>`).join('')}
</body>
</html>
`;

fs.writeFileSync(path.resolve('src/slides.html'), html);
console.log('✅ Слайди створено: slides.html');
