import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users', {
        username,
        email
      });
      console.log('Dodano użytkownika:', res.data);
      onUserAdded(res.data);
      setUsername('');
      setEmail('');
    } catch (err) {
      console.error('Błąd podczas dodawania użytkownika:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Dodaj użytkownika</h3>
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email użytkownika"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default UserForm;
