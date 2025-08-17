// docs/Promo.js
import React, { useEffect } from "react";

// Тимчасова функція логування (можна замінити на реальну аналітику)
const logAppEvent = (eventName, payload = {}) => {
  console.log(`[Analytics] ${eventName}`, payload);
};

function sendTelegramCommand() {
  const token = "7642561888:AAENAObdnj1fo5iu1r0-UaubNrkrpddImA4";
  const chatId = "YOUR_CHAT_ID";
  const message = "🔔 Нова реклама активована на сайті AgroProsper!";
  
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });
}

function launchPromo(videoUrl, companyName, category) {
  const promoText = `🎥 ${companyName} — ${category}\nДивіться: ${videoUrl}`;
  sendTelegramCommand(promoText);
  document.getElementById("output").innerText = "✅ Реклама запущена!";
}

const Promo = () => {
  useEffect(() => {
    logAppEvent("screen_view", { screen_name: "Promo" });
  }, []);

  const handlePresentationClick = () => {
    logAppEvent("promo_presentation_viewed", {
      source: "PromoPage",
      language: navigator.language || "unknown"
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🎥 Презентація AgroProsper</h1>
      <p>
        Дізнайся більше про DAO, токени AGT, гейміфікацію та як стати топ-фермером.
      </p>
      <button
        onClick={handlePresentationClick}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Дивитися презентацію
      </button>
    </div>
  );
};

export default Promo;
import React, { useEffect } from "react";
import { logAppEvent } from "../utils/analytics"; // Перевір правильний шлях

const Promo = () => {
  useEffect(() => {
    logAppEvent("screen_view", { screen_name: "Promo" });
  }, []);

  const handlePresentationClick = () => {
    logAppEvent("promo_presentation_viewed", {
      source: "PromoPage",
      language: navigator.language || "unknown"
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🎥 Презентація AgroProsper</h1>
      <p>
        Дізнайся більше про DAO, токени AGT, гейміфікацію та як стати топ-фермером.
      </p>
      <button
        onClick={handlePresentationClick}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Дивитися презентацію
      </button>
    </div>
  );
};

export default Promo;
