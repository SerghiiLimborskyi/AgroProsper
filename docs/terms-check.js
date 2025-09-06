window.addEventListener("load", () => {
  const agreed = localStorage.getItem("termsAccepted");

  // Якщо згоди немає — показати попередження
  if (!agreed) {
    const warning = document.createElement("div");
    warning.innerHTML = `
      <div style="background:#111; color:#f00; padding:20px; text-align:center; font-weight:bold;">
        ⚠️ Ви ще не погодились з <a href="terms.html" style="color:#0ff;">Умовами Microsoft</a><br>
        <button id="acceptTerms" style="margin-top:10px; padding:10px; background:#0f0; color:#000; font-weight:bold;">✅ Погодитись</button>
      </div>
    `;
    document.body.prepend(warning);

    document.getElementById("acceptTerms").addEventListener("click", () => {
      localStorage.setItem("termsAccepted", "true");
      warning.remove();
    });
  }
});
