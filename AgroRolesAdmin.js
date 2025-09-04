// AgroRoles.js — розмежування доступу за ролями

export const ROLE_MAP = {
  "0xA1B2C3D4E5F6G7H8I9J0": "admin",
  "0xF7E8D9C0B1A2D3E4F5G6": "editor",
  "0x123456789ABCDEF00000": "reader"
};

export function getUserRole(address) {
  const normalized = address.trim().toUpperCase();
  return ROLE_MAP[normalized] || "guest";
}

export function hasPermission(role, action) {
  const PERMISSIONS = {
    reader: ["view"],
    editor: ["view", "edit"],
    admin: ["view", "edit", "delete"]
  };
  return PERMISSIONS[role]?.includes(action);
}
