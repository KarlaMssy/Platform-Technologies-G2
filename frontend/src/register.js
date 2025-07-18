import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { Link } from 'react-router-dom';

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
    <div className="container">
      <div className="nav-buttons">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
