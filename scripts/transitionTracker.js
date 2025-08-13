function getFingerprint() {
  return `${navigator.language}-${navigator.platform}-${navigator.userAgent.slice(0, 20)}`;
}
fetch('/api/referral-transition', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    timestamp: new Date().toISOString(),
    referral_tag: 'AGT-XYZ123',
    user_data: { browser_fingerprint: getFingerprint() }
  })
});
