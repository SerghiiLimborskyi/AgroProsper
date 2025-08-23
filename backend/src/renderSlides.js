import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve('src/slides.html')}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'src/slides.png', fullPage: true });
  await browser.close();
  console.log('🖼️ Слайди збережено як slides.png');
})();
