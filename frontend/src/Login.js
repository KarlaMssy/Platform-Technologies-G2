import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}

