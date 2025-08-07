import React, { useState } from "react";
import { handleMint } from "./mint-api";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    account: "",
    wallet: ""
  });

  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleMint(formData);
    setFeedback(result.message);
    setIsSuccess(result.success);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Реєстрація користувача</h2>

      <input
        type="text"
        name="name"
        placeholder="Ім’я"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="account"
        placeholder="IBAN"
        value={formData.account}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="wallet"
        placeholder="Ethereum-адреса"
        value={formData.wallet}
        onChange={handleChange}
        required
      />

      <button type="submit">Зареєструватися</button>

      {feedback && (
        <p style={{ color: isSuccess ? "green" : "red", marginTop: "10px" }}>
          {feedback}
        </p>
      )}
    </form>
  );
}
