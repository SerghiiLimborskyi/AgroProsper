// config-loader.js — завантаження DAO-конфігурації

let daoConfig = {};

async function loadDAOConfig() {
  try {
    const res = await fetch("config/analytics-config.json");
    daoConfig = await res.json();
    console.log("✅ DAO-конфігурація завантажена");
    applyTheme(daoConfig.theme.default);
    initCharts(daoConfig.charts);
  } catch (err) {
    console.error("❌ Помилка завантаження конфігурації:", err);
  }
}

function applyTheme(themeName) {
  if (daoConfig.theme.available.includes(themeName)) {
    document.documentElement.setAttribute("data-theme", themeName);
  }
}

function initCharts(charts) {
  Object.entries(charts).forEach(([key, chart]) => {
    const ctx = document.getElementById(`${key}Chart`)?.getContext("2d");
    if (!ctx) return;

    new Chart(ctx, {
      type: chart.type,
      data: {
        labels: chart.labels,
        datasets: [{
          label: chart.title,
          data: getChartData(chart.dataSource),
          backgroundColor: chart.colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: chart.title }
        }
      }
    });
  });
}

function getChartData(sourceKey) {
  if (!sourceKey.startsWith("localStorage.")) return [];
  const key = sourceKey.split(".")[1];
  const raw = localStorage.getItem(key);
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

document.addEventListener("DOMContentLoaded", loadDAOConfig);
