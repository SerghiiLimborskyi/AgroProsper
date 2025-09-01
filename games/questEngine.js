export function checkQuestProgress(badges) {
  const required = ["badge_yes", "badge_no", "badge_ai"];
  const unlocked = required.every(id => badges.some(b => b.id === id));

  if (unlocked) {
    alert("🎉 Квест завершено! Відкрито новий рівень.");
    // Тут можна показати нову гру, локацію або бейдж
  } else {
    console.log("🔒 Квест ще не завершено");
  }
}
