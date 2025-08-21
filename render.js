const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const slidesDir = path.join(__dirname, 'studio');
  const outputDir = path.join(__dirname, 'screenshots');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.html'));

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(slidesDir, files[i]);
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1280, height: 720 });
    const outputPath = path.join(outputDir, `slide${i + 1}.png`);
    await page.screenshot({ path: outputPath });
    console.log(`✅ Rendered: ${outputPath}`);
  }

  await browser.close();
})();
