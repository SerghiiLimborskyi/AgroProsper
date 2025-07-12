const fs = require('fs');
const path = require('path');

const baseUrl = 'https://serghiilimborskyi.github.io/AgroProsper';
const docsDir = path.join(__dirname, '..');
const outputFile = path.join(docsDir, 'sitemap.xml');

function findHtmlFiles(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let urls = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(prefix, entry.name);

    if (entry.isDirectory()) {
      urls = urls.concat(findHtmlFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      urls.push(`${baseUrl}/${relativePath.replace(/\\/g, '/')}`);
    }
  }

  return urls;
}

const urls = findHtmlFiles(docsDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(outputFile, sitemap);
console.log(`✅ Sitemap generated: ${outputFile}`);
