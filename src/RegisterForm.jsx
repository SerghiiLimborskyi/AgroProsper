import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    account: '',
    wallet: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Помилка реєстрації');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Реєстрація користувача</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Ім’я" onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="account" placeholder="Рахунок (необов’язково)" onChange={handleChange} /><br />
        <input name="wallet" placeholder="Адреса гаманця" onChange={handleChange} required /><br />
        <button type="submit">Зареєструватися</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
