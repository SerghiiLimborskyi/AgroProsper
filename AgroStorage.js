// AgroStorage.js — DAO-контроль доступу

import { verifyAdmin } from './AgroAccessLog.js';
import { CID_INDEX } from './CID-index.js';

export function requestAccess(cid) {
  const userAddress = prompt("🔐 Введіть вашу DAO-адресу:");
  if (!userAddress) return alert("❌ Адреса не вказана.");

  const accessGranted = verifyAdmin(userAddress, cid);
  if (accessGranted) {
    const filePath = CID_INDEX[cid];
    window.open(filePath, '_blank');
    console.log(`✅ Доступ надано до ${filePath}`);
  } else {
    alert("🚫 Доступ заборонено. Ви не є DAO-учасником.");
    console.warn(`❌ Відмова доступу для ${userAddress} до CID ${cid}`);
  }
}
