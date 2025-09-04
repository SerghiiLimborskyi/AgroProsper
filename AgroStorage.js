// AgroRoles.js — розмежування доступу за ролями

const ROLE_MAP = {
  "0xA1B2C3D4E5F6G7H8I9J0": "admin",     // Serhii DAO
  "0xF7E8D9C0B1A2D3E4F5G6": "editor",    // Trusted Agent
  "0x123456789ABCDEF00000": "reader",    // GOV Observer
  "0x0000ABCDEF1234567890": "reader"     // External Auditor
};

// 🔍 Отримати роль користувача
export function getUserRole(address) {
  const normalized = address.trim().toUpperCase();
  return ROLE_MAP[normalized] || "guest";
}

// ✅ Перевірити доступ до дії
export function hasPermission(role, action) {
  const PERMISSIONS = {
    reader: ["view"],
    editor: ["view", "edit"],
    admin: ["view", "edit", "delete"]
  };
  return PERMISSIONS[role]?.includes(action);
}
