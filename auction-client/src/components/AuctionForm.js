import React, { useState } from 'react';
import axios from 'axios';

const AuctionForm = ({ onAuctionAdded, token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    startingPrice: 0,
    endTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  axios.post('http://localhost:5000/api/auctions', form, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(() => {
      onAuctionAdded();
      setForm({
        title: '',
        description: '',
        category: '',
        startingPrice: 0,
        endTime: ''
      });
    })
    .catch(err => {
      console.error('Błąd przy dodawaniu aukcji:', err);
      alert('Nie udało się dodać aukcji.');
    });
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Dodaj aukcję</h3>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Tytuł" required />
      <br />
      <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Opis" required />
      <br />
      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Kategoria" required />
      <br />
      <input type="number" name="startingPrice" value={form.startingPrice} onChange={handleChange} placeholder="Cena początkowa" required />
      <br />
      <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} required />
      <br />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default AuctionForm;
