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
  const ibanCountryMap = {
  AL: "Албанія", AT: "Австрія", BE: "Бельгія", BG: "Болгарія", CH: "Швейцарія",
  CY: "Кіпр", CZ: "Чехія", DE: "Німеччина", DK: "Данія", EE: "Естонія",
  ES: "Іспанія", FI: "Фінляндія", FR: "Франція", GB: "Велика Британія",
  GR: "Греція", HR: "Хорватія", HU: "Угорщина", IE: "Ірландія", IT: "Італія",
  LT: "Литва", LU: "Люксембург", LV: "Латвія", MT: "Мальта", NL: "Нідерланди",
  NO: "Норвегія", PL: "Польща", PT: "Португалія", RO: "Румунія",
  SE: "Швеція", SI: "Словенія", SK: "Словаччина", UA: "Україна"
};


  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [country, setCountry] = useState("");
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
    const formatIBAN = (value) => {
  return value
    .replace(/[^A-Z0-9]/gi, "") // видаляємо все, крім літер і цифр
    .toUpperCase()
    .match(/.{1,4}/g) // групуємо по 4 символи
    ?.join(" ") || "";
};

const handleChange = (e) => {
  const { name, value } = e.target;

 if (name === "account") {
  const raw = value.replace(/\s+/g, "");
  const formatted = formatIBAN(raw);
  const countryCode = raw.slice(0, 2).toUpperCase();
  const countryHint = ibanCountryMap[countryCode] || "";
  setFormData({ ...formData, account: raw });
  setCountry(countryHint);
  e.target.value = formatted;
}

  
  setErrors({ ...errors, [name]: "" }); // очищення помилки при зміні
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
