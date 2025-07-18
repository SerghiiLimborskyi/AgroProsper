const fs = require("fs");

const template = fs.readFileSync("docs/template.html", "utf8");
const data = JSON.parse(fs.readFileSync("docs/dao-data.json", "utf8"));

let output = template;
for (const key in data) {
  output = output.replaceAll(`%%${key}%%`, data[key]);
}

fs.writeFileSync("docs/index.html", output);
console.log("✅ index.html згенеровано!");
