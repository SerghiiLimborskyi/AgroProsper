const fs = require("fs");
const path = require("path");

const releasePath = path.join(__dirname, "..", "release.json");
const versionsDir = path.join(__dirname, "..", "versions");
const pendingDir = path.join(__dirname, "..", "pending");

function loadRelease() {
  if (!fs.existsSync(releasePath)) return null;
  return JSON.parse(fs.readFileSync(releasePath, "utf8"));
}

function archiveVersion(version) {
  const source = path.join(versionsDir, version);
  const target = path.join(versionsDir, `${version}_backup`);
  if (fs.existsSync(source)) {
    fs.cpSync(source, target, { recursive: true });
    console.log(`📦 Архівовано версію ${version}`);
  }
}

function promotePending(release) {
  const target = path.join(versionsDir, release.version);
  const source = path.join(pendingDir, release.version);
  if (fs.existsSync(source)) {
    fs.cpSync(source, target, { recursive: true });
    console.log(`🚀 Версія ${release.version} активована`);
    release.status = "released";
    fs.writeFileSync(releasePath, JSON.stringify(release, null, 2));
  } else {
    console.log(`⚠️ Папка ${release.version} не знайдена в pending`);
  }
}

function main() {
  const release = loadRelease();
  if (!release || release.status !== "pending") {
    console.log("✅ Немає нових версій для оновлення");
    return;
  }

  archiveVersion(release.source);
  promotePending(release);
}

main();
