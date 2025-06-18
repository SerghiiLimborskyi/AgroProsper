const fs = require('fs');
const path = require('path');
const plan = require('./update-plan.json');

function fileExists(relPath) {
  return fs.existsSync(path.join(__dirname, '..', relPath));
}

function containsRequiredLines(file, lines) {
  if (!fileExists(file)) return false;
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  return lines.every(line => content.includes(line));
}

let errors = [];

for (const f of plan.files) {
  if (!fileExists(f)) errors.push(`❌ Відсутній файл: ${f}`);
}

for (const file in plan.mustContain) {
  if (!containsRequiredLines(file, plan.mustContain[file])) {
    errors.push(`❌ ${file} не містить потрібних фрагментів`);
  }
}

if (errors.length > 0) {
  console.error('⛔ Структура неповна:\n' + errors.join('\n'));
  process.exit(1);
}

console.log('✅ Все добре: структура відповідає плану!');
