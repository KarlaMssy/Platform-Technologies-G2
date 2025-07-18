import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

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
    <div className="container">
      <div className="nav-buttons">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
