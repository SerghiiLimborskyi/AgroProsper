// planetAlert.js — моральний індикатор екологічного стану

async function checkPlanetStatus() {
  try {
    const res = await fetch("config/analytics-config.json");
    const config = await res.json();
    const thresholds = config.planetStatus.thresholds;
    const labels = config.planetStatus.labels;

    const co2 = parseFloat(document.getElementById("co2").textContent);
    const radiation = parseFloat(document.getElementById("radiation").textContent);

    let status = labels.green;

    if (co2 > thresholds.co2.red || radiation > thresholds.radiation.red) {
      status = labels.red;
      triggerEcoQuest();
    } else if (co2 > thresholds.co2.yellow || radiation > thresholds.radiation.yellow) {
      status = labels.yellow;
    }

    document.getElementById("planetStatus").textContent = `🌍 Стан планети: ${status}`;
  } catch (err) {
    console.error("❌ Помилка перевірки стану планети:", err);
  }
}

function triggerEcoQuest() {
  alert("🚨 Екологічна тривога! Активовано ecoQuest.");
  // Можна перенаправити:
  // window.location.href = "ecoQuest.html";
}

document.addEventListener("DOMContentLoaded", checkPlanetStatus);
