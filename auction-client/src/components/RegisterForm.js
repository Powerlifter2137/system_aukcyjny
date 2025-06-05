import React, { useState } from 'react';

function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      setMessage('Rejestracja zakończona sukcesem! Możesz się zalogować.');
      onRegisterSuccess();
    } else {
      setMessage('Błąd rejestracji.');
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nazwa użytkownika" required />
        <br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" required />
        <br />
        <button type="submit">Zarejestruj się</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
