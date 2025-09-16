async function syncBadgesToIPFS() {
  const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
  if (!achievements.length) return console.warn("❗ Немає бейджів для синхронізації");

  for (const badge of achievements) {
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
        "pinata_api_key": "YOUR_API_KEY",
        "pinata_secret_api_key": "YOUR_SECRET_KEY"
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    console.log(`✅ Бейдж ${badge.title} синхронізовано: ipfs://${json.IpfsHash}`);
    badge.cid = json.IpfsHash;
  }

  localStorage.setItem("achievements", JSON.stringify(achievements));
}
