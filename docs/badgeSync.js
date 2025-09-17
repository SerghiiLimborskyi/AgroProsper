// 🔐 Встав API-ключі Pinata
const PINATA_API_KEY = "YOUR_API_KEY";
const PINATA_SECRET_KEY = "YOUR_SECRET_KEY";

// 🚀 Завантаження одного бейджа на IPFS
async function uploadBadgeToIPFS(badge) {
  const payload = {
    id: badge.id,
    title: badge.title,
    description: badge.desc,
    image: badge.img,
    date: badge.date || new Date().toISOString().split("T")[0],
    source: badge.source || "DAO",
    role: badge.role || "guest"
  };

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "pinata_api_key": PINATA_API_KEY,
      "pinata_secret_api_key": PINATA_SECRET_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("❌ Помилка при завантаженні на IPFS");

  const json = await res.json();
  return json.IpfsHash;
}

// 🔄 Синхронізація всіх бейджів
async function syncBadgesToIPFS() {
  const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
  if (!achievements.length) {
    alert("❗ Немає бейджів для синхронізації");
    return;
  }

  for (let badge of achievements) {
    if (badge.cid) continue; // вже синхронізовано

    try {
      const cid = await uploadBadgeToIPFS(badge);
      badge.cid = cid;
      console.log(`✅ ${badge.title} → ipfs://${cid}`);
    } catch (err) {
      console.error(`❌ ${badge.title}:`, err.message);
    }
  }

  localStorage.setItem("achievements", JSON.stringify(achievements));
  alert("✅ Синхронізація завершена");
}

// 📦 Кнопка для запуску
document.addEventListener("DOMContentLoaded", () => {
  const syncBtn = document.createElement("button");
  syncBtn.textContent = "🔄 Синхронізувати бейджі з IPFS";
  syncBtn.style = "margin:20px;padding:10px;background:#00ff99;border:none;border-radius:8px;font-weight:bold;";
  syncBtn.onclick = syncBadgesToIPFS;
  document.body.appendChild(syncBtn);
});
async function syncBadgesToIPFS() {
  const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
  if (!achievements.length) return alert("❗ Немає бейджів для синхронізації");

  for (let badge of achievements) {
    if (badge.cid) continue;

    const payload = {
      id: badge.id,
      title: badge.title,
      description: badge.desc,
      image: badge.img,
      date: badge.date || new Date().toISOString().split("T")[0],
      source: badge.source || "DAO",
      role: badge.role || "guest"
    };

    const res = await fetch("https://api.nft.storage/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NFT_STORAGE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (!json.ok) {
      console.error(`❌ ${badge.title}:`, json.error.message);
      continue;
    }

    badge.cid = json.value.cid;
    console.log(`✅ ${badge.title} → ipfs://${badge.cid}`);
  }

  localStorage.setItem("achievements", JSON.stringify(achievements));
  alert("✅ Синхронізація завершена");
}

// 📦 Кнопка для запуску
document.addEventListener("DOMContentLoaded", () => {
  const syncBtn = document.createElement("button");
  syncBtn.textContent = "🔄 Синхронізувати бейджі з IPFS";
  syncBtn.style = "margin:20px;padding:10px;background:#00ff99;border:none;border-radius:8px;font-weight:bold;";
  syncBtn.onclick = syncBadgesToIPFS;
  document.body.appendChild(syncBtn);
});
