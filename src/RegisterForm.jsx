import React, { useState } from "react";
import { handleMint } from "./mint-api";
import { isValidEmail, isValidIBAN } from "./validators"; // якщо є окремо

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    account: "",
    wallet: ""
  });

  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Ім’я обов’язкове";
    if (!isValidEmail(formData.email)) newErrors.email = "Невірний email";
    if (!isValidIBAN(formData.account)) newErrors.account = "Невірний IBAN";
    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.wallet)) newErrors.wallet = "Невірна Ethereum-адреса";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // очищення помилки при зміні
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await handleMint(formData);
    setFeedback(result.message);
    setIsSuccess(result.success);
  };

  const inputStyle = (field) => ({
    borderColor: errors[field] ? "red" : "#ccc",
    marginBottom: "5px"
  });

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Реєстрація користувача</h2>

      <input
        type="text"
        name="name"
        placeholder="Ім’я"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle("name")}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle("email")}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        type="text"
        name="account"
        placeholder="IBAN"
        value={formData.account}
        onChange={handleChange}
        style={inputStyle("account")}
      />
      {errors.account && <p style={{ color: "red" }}>{errors.account}</p>}

      <input
        type="text"
        name="wallet"
        placeholder="Ethereum-адреса"
        value={formData.wallet}
        onChange={handleChange}
        style={inputStyle("wallet")}
      />
      {errors.wallet && <p style={{ color: "red" }}>{errors.wallet}</p>}

      <button type="submit">Зареєструватися</button>

      {feedback && (
        <p style={{ color: isSuccess ? "green" : "red", marginTop: "10px" }}>
          {feedback}
        </p>
      )}
    </form>
  );
}
