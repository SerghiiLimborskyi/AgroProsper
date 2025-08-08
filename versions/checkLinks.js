const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const targetDir = path.join(__dirname, "..", "versions");

async function checkLink(url) {
  try {
    const response = await axios.head(url, { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function scanHtml(filePath) {
 if (!fs.existsSync(targetDir)) {
  console.error(`❌ Папка ${targetDir} не існує. Створи її або зміни шлях.`);
  return;
}
 
  const content = fs.readFileSync(filePath, "utf8");
  const $ = cheerio.load(content);
  const links = $("a[href]").map((i, el) => $(el).attr("href")).get();

  const broken = [];
  for (const link of links) {
    if (link.startsWith("http")) {
      const valid = await checkLink(link);
      if (!valid) broken.push(link);
    }
  }

  if (broken.length > 0) {
    console.log(`❌ ${filePath} має биті посилання:`);
    broken.forEach(link => console.log(`   - ${link}`));
  } else {
    console.log(`✅ ${filePath} — всі посилання валідні`);
  }
}

async function main() {
  const files = fs.readdirSync(targetDir, { withFileTypes: true });

  for (const dirent of files) {
    if (dirent.isDirectory()) {
      const htmlFiles = fs.readdirSync(path.join(targetDir, dirent.name))
        .filter(f => f.endsWith(".html"));

      for (const file of htmlFiles) {
        const fullPath = path.join(targetDir, dirent.name, file);
        await scanHtml(fullPath);
      }
    }
  }
}

main();
