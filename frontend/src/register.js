import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', form);
      setMessage('Registration successful! You can now login.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
