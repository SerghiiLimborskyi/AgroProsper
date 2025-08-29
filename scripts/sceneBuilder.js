export function generateScene(type, user, data) {
  const scene = {
    sceneId: `${type}_${user}_${Date.now()}`,
    backgroundVideo: `public/${type}_background.mp4`,
    voiceOver: `public/audio/${type}_voice.mp3`,
    textOverlay: {
      content: `${type.toUpperCase()} — цифрова подія\n${data}`,
      font: "Share Tech Mono",
      color: "#00FF66",
      animation: "glitch"
    },
    qrCode: {
      link: `https://serghiilimborskyi.github.io/AgroProsper/${type}-badge`
    }
  };
  saveScene(scene);
}
