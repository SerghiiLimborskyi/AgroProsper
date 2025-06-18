const fs = require('fs');
const path = require('path');
const cacheFile = path.join(__dirname, '.autofix.cache.json');
const templatesDir = path.join(__dirname, 'templates');

const files = ['sync-agent.js', 'update-plan.json'];
let restored = [];

files.forEach(f => {
  const dest = path.join(__dirname, f);
  const template = path.join(templatesDir, f);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(template, dest);
    restored.push(f);
  }
});

if (restored.length > 0) {
  fs.writeFileSync(cacheFile, JSON.stringify({ restored, time: new Date() }, null, 2));
  console.log(`🛠️ Відновлено файли: ${restored.join(', ')}`);
} else {
  console.log('✅ Усі файли на місці. Автовиправлення не потрібне.');
}
