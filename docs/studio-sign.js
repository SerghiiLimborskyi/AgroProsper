// studio-sign.js

export async function generateSignature(entry) {
  const encoder = new TextEncoder();
  const raw = JSON.stringify({
    editor: entry.editor,
    timestamp: entry.timestamp,
    action: entry.action,
    video: entry.video
  });
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifySignature(entry) {
  const expected = await generateSignature(entry);
  return expected === entry.signature;
}
