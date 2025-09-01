export function mintBadgeSelf(roleIndex) {
  const roles = ["Starter", "Farmer", "Trader"];
  const badge = {
    id: `badge_${roles[roleIndex].toLowerCase()}`,
    title: `Бейдж: ${roles[roleIndex]}`,
    image: `badge_${roles[roleIndex].toLowerCase()}.png`,
    timestamp: new Date().toISOString()
  };

  let badges = JSON.parse(localStorage.getItem("badges") || "[]");
  badges.push(badge);
  localStorage.setItem("badges", JSON.stringify(badges));

  alert(`🏅 Бейдж "${badge.title}" успішно видано!`);
}
