export function loadBadgeDashboard() {
  const cid = localStorage.getItem("cid") || "Гість";
  const role = localStorage.getItem("role") || "guest";

  const container = document.querySelector("#badgeContainer");
  if (!container) return;

  container.innerHTML = `
    <h2>🏅 Бейджі для ролі: ${role}</h2>
    <p>CID: <strong>${cid}</strong></p>
    <div class="badge-grid">
      ${renderBadge("Starter", "badge-agent.png")}
      ${renderBadge("Verified", "badge-partner.png")}
      ${renderBadge("Expert", "badge-analyst.png")}
      ${renderBadge("NFT", "badge-nft.png")}
    </div>
  `;
}

function renderBadge(level, img) {
  return `
    <div class="badge-card">
      <img src="assets/${img}" alt="${level}" />
      <p>${level}</p>
    </div>
  `;
}
