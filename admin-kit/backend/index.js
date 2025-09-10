// admin-kit.js — централізоване DAO-управління

const API_BASE = "https://your-backend-url.com/api";
const TOKEN_KEY = "adminToken";

// 🔐 Авторизація через токен
export async function verifyToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_BASE}/secure-endpoint`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Авторизація не вдалася");
  console.log("✅ Авторизовано");
}

// 🧬 Генерація нового токена
export async function generateAdminToken() {
  const res = await fetch(`${API_BASE}/admin/gen-token`, { method: "POST" });
  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  console.log("🔑 Новий токен збережено");
}

// 🔄 Оновлення CID агента
export async function sendCIDUpdate(cid, newRole) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_BASE}/admin/update-cid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ cid, role: newRole })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Помилка оновлення CID");
  console.log(`🧠 CID ${cid} оновлено до ролі ${newRole}`);
}

// 🧾 Логування дій адміністратора
export async function logAdminAction(action, cid) {
  const token = localStorage.getItem(TOKEN_KEY);
  await fetch(`${API_BASE}/admin/log-action`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ action, cid, timestamp: Date.now() })
  });
  console.log(`📜 Лог записано: ${action} → ${cid}`);
}

// 🚨 Сповіщення про ризики
export function alertSecurityRisk(message) {
  const box = document.getElementById("securityAlert");
  if (box) {
    box.innerHTML = `⚠️ ${message}`;
    box.style.backgroundColor = "#ff3366";
  } else {
    alert(`⚠️ ${message}`);
  }
}
