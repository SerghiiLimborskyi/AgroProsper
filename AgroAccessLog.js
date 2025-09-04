// AgroAccessLog.js — DAO-логіка перевірки та логування

const DAO_WHITELIST = [
  "0xA1B2C3D4E5F6G7H8I9J0", // Serhii DAO
  "0xF7E8D9C0B1A2D3E4F5G6", // Trusted Agent
  "0x123456789ABCDEF00000"  // GOV Observer
];

export function verifyAdmin(address, cid) {
  const normalized = address.trim().toUpperCase();
  const isAllowed = DAO_WHITELIST.includes(normalized);
  logAccessAttempt(normalized, cid, isAllowed);
  return isAllowed;
}

function logAccessAttempt(address, cid, result) {
  const timestamp = new Date().toISOString();
  const status = result ? "GRANTED" : "DENIED";
  console.log(`[${timestamp}] Access ${status} for ${address} to CID ${cid}`);
}
