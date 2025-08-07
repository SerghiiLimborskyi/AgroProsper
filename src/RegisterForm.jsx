import React, { useState } from "react";

const ibanCountryMap = {
  UA: "Україна",
  PL: "Польща",
  DE: "Німеччина",
  FR: "Франція",
  IT: "Італія",
  ES: "Іспанія",
  NL: "Нідерланди",
  BE: "Бельгія",
  AT: "Австрія",
  CH: "Швейцарія",
  GB: "Велика Британія",
};

const ibanCountryMap = {
  ...,
  NO: "Норвегія",
  SE: "Швеція",
  DK: "Данія",
  FI: "Фінляндія",
  CZ: "Чехія",
  SK: "Словаччина",
  HU: "Угорщина",
  RO: "Румунія",
  BG: "Болгарія",
  GR: "Греція",
};

const ibanLengthMap = {
  ...,
  NO: 15,
  SE: 24,
  DK: 18,
  FI: 18,
  CZ: 24,
  SK: 24,
  HU: 28,
  RO: 24,
  BG: 22,
  GR: 27,
};


const ibanLengthMap = {
  UA: 29,
  PL: 28,
  DE: 22,
  FR: 27,
  IT: 27,
  ES: 24,
  NL: 18,
  BE: 16,
  AT: 20,
  CH: 21,
  GB: 22,
};

const bankCodeMapUA = {
  "300001": "ПриватБанк",
  "322001": "Ощадбанк",
  "305299": "Укргазбанк",
  "320478": "Райффайзен Банк",
  "380775": "Монобанк",
  // додай інші банки за потреби
};

function formatIBAN(value) {
  return value
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .toUpperCase();
}

function isValidIBAN(iban, countryCode) {
  const cleaned = iban.replace(/\s+/g, "").toUpperCase();
  const regex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  const expectedLength = ibanLengthMap[countryCode];
  return regex.test(cleaned) && cleaned.length === expectedLength;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    account: "",
  });

  const [country, setCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [ibanError, setIbanError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "account") {
      const formatted = formatIBAN(value);
      const cleaned = formatted.replace(/\s+/g, "");
      const code = cleaned.slice(0, 2);
      const countryName = ibanCountryMap[code] || "Невідома країна";
      setCountry(countryName);

      if (!ibanLengthMap[code]) {
        setIbanError("❌ Невідома країна IBAN або не підтримується");
        setBankName("");
      } else if (!isValidIBAN(cleaned, code)) {
        setIbanError(
          `❌ Некоректний IBAN. Очікувана довжина для ${countryName}: ${ibanLengthMap[code]} символів`
        );
        setBankName("");
      } else {
        setIbanError("");

        if (code === "UA") {
          const bankCode = cleaned.slice(4, 10);
          const bank = bankCodeMapUA[bankCode] || "Невідомий банк";
          setBankName(bank);
        } else {
          setBankName("Автозаповнення недоступне");
        }
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ibanError) {
      alert("Будь ласка, виправте помилки у формі.");
      return;
    }
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ім’я:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        IBAN рахунок:
        <input
          type="text"
          name="account"
          value={formData.account}
          onChange={handleChange}
        />
      </label>
      <p>🌍 Країна IBAN: <strong>{country}</strong></p>
      <p>🏦 Банк: <strong>{bankName}</strong></p>
      {ibanError && <p style={{ color: "red" }}>{ibanError}</p>}
      <br />
      <button type="submit">Зареєструватися</button>
    </form>
  );
}
