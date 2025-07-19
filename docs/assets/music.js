const audio = new Audio("assets/promo.mp3");
audio.loop = true;
audio.volume = 0.3;

window.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("music-toggle");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = "🔊";
      } else {
        audio.pause();
        playBtn.textContent = "🔈";
      }
    });
  }
});
