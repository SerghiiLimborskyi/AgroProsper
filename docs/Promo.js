// src/pages/Promo.js
import React, { useEffect } from "react";
import { logAppEvent } from "../utils/analytics";

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
    <div style={{ padding: "2rem" }}>
      <h1>🎥 Презентація AgroProsper</h1>
      <p>Дізнайся більше про DAO, токени AGT та гейміфікацію</p>
      <button onClick={handlePresentationClick}>Дивитися презентацію</button>
    </div>
  );
};

export default Promo;
