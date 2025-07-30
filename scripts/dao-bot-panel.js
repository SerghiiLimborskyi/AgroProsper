function sendBotCommand(cmd) {
  const url = `https://t.me/AgroProsperBot?start=${encodeURIComponent(cmd)}`;
  window.open(url, '_blank');
}
