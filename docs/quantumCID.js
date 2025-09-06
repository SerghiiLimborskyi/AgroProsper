const quantumCID = {
  predictAction: function (cid) {
    if (!cid) return "Немає CID";
    const entropy = cid.length * Math.random();
    if (entropy < 50) return "🧠 Імовірність: перегляд відео";
    if (entropy < 100) return "🧠 Імовірність: участь у квесті";
    return "🧠 Імовірність: оновлення статусу";
  },

  displayPrediction: function () {
    const cid = localStorage.getItem("cid");
    const prediction = this.predictAction(cid);
    const box = document.getElementById("quantumBox");
    if (box) box.innerText = prediction;
  }
};

window.addEventListener("load", () => {
  quantumCID.displayPrediction();
});
