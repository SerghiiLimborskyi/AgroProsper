// AgroRolesAdmin.js — DAO-адміністрування ролей

export const ROLE_MAP = {
  "0xA1B2C3D4E5F6G7H8I9J0": "admin",
  "0xF7E8D9C0B1A2D3E4F5G6": "editor",
  "0x123456789ABCDEF00000": "reader"
};

// 🔧 Змінити роль користувача
export function setUserRole(address, role) {
  const normalized = address.trim().toUpperCase();
  ROLE_MAP[normalized] = role;
}

// 🗑️ Видалити користувача
export function removeUser(address) {
  const normalized = address.trim().toUpperCase();
  delete ROLE_MAP[normalized];
}
