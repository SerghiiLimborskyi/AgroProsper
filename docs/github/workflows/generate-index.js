const fs = require("fs");

const template = fs.readFileSync("docs/template.html", "utf8");
const data = JSON.parse(fs.readFileSync("docs/dao-data.json", "utf8"));

let output = template;
for (const key in data) {
  output = output.replaceAll(`%%${key}%%`, data[key]);
}

fs.writeFileSync("docs/index.html", output);
console.log("✅ index.html згенеровано!");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("docs/dao-data.json", "utf8"));
const template = fs.readFileSync("docs/template.html", "utf8");

let output = template;
for (const key in data) {
  output = output.replaceAll(`%%${key}%%`, data[key]);
}

// Зберігаємо index.html
fs.writeFileSync("docs/index.html", output);

// Формуємо паралельний preview-файл
fs.writeFileSync("docs/v1.1-preview.html", output);

console.log("✅ Згенеровано index.html + v1.1-preview.html");
const buildStatus = {
  version: "v1.1",
  build: "Автозбірка активна",
  date: new Date().toISOString().split("T")[0],
  next: "🧪 DAO Dashboard + NFT Mint Engine"
};

fs.writeFileSync("docs/status.json", JSON.stringify(buildStatus, null, 2));
