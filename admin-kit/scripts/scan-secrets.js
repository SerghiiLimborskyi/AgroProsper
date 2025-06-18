const fs = require('fs');
const files = ['.env', 'backend/index.js', 'script.js'];
const regex = /(ghp|github_pat|api|token|secret)[^\s"']{10,}/gi;

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(regex);
    if (matches) {
      console.warn(`⚠️ Секрети в ${file}:\n`, matches);
    }
  }
});
