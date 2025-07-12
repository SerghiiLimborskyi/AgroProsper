function generateCard({ name, badge, joinDate, tokenId }) {
  return `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e0ffe0"/>
      <text x="20" y="40" font-size="20" fill="#333">👤 ${name}</text>
      <text x="20" y="80" font-size="16" fill="#555">🎖️ ${badge}</text>
      <text x="20" y="120" font-size="14" fill="#777">📅 ${joinDate}</text>
      <text x="20" y="160" font-size="14" fill="#999">🆔 ${tokenId}</text>
    </svg>
  `;
}

module.exports = { generateCard };
