const fs = require('fs');
const path = require('path');
const plan = require('./update-plan.json');

function fileExists(relPath) {
  return fs.existsSync(path.join(__dirname, '..', relPath));
}

function containsRequiredLines(file, lines) {
  if (!fileExists(file)) return false;
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  return lines.every(line => content.includes(line));
}

let errors = [];

for (const f of plan.files) {
  if (!fileExists(f)) errors.push(`❌ Відсутній файл: ${f}`);
}

for (const file in plan.mustContain) {
  if (!containsRequiredLines(file, plan.mustContain[file])) {
    errors.push(`❌ ${file} не містить потрібних фрагментів`);
  }
}

if (errors.length > 0) {
  console.error('⛔ Структура неповна:\n' + errors.join('\n'));
  process.exit(1);
}

console.log('✅ Все добре: структура відповідає плану!');

function loadMyOrders(region = '', product = '', start = '', end = '') {
  const url = new URL('https://your-domain.com/api/my-orders');
  url.searchParams.append('ref', ref);
  if (region) url.searchParams.append('region', region);
  if (product) url.searchParams.append('product', product);
  if (start) url.searchParams.append('start', start);
  if (end) url.searchParams.append('end', end);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('orders');
      if (!Array.isArray(data.orders) || data.orders.length === 0) {
        container.textContent = '😔 Немає замовлень за цим фільтром.';
        return;
      }

      container.innerHTML = data.orders.map(o => `
        <div class="order-card">
          <h3>📦 ${o.product}</h3>
          <p>📍 ${o.region}</p>
          <p>📐 ${o.amount}</p>
          <p>📞 ${o.buyer_contact}</p>
          <p>🕒 ${new Date(o.timestamp).toLocaleString()}</p>
        </div>
      `).join('');
    })
    .catch(() => {
      document.getElementById('orders').textContent = '❌ Помилка при завантаженні.';
    });
}

document.getElementById('filter-btn').onclick = () => {
  const region = document.getElementById('region')?.value.trim() || '';
  const product = document.getElementById('product')?.value.trim() || '';
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  loadMyOrders(region, product, start, end);
};

loadMyOrders(); // стартове завантаження
