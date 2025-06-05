import React, { useState } from 'react';
import axios from 'axios';

const AuctionForm = ({ onAuctionAdded, token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    startingPrice: '',
    endTime: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(form.startingPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Podaj poprawną cenę początkową większą niż 0.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/auctions',
        { ...form, startingPrice: parsedPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAuctionAdded?.();

      setForm({
        title: '',
        description: '',
        category: '',
        startingPrice: '',
        endTime: ''
      });
      setError('');
    } catch (err) {
      console.error('Błąd przy dodawaniu aukcji:', err);
      setError('Nie udało się dodać aukcji.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Dodaj aukcję</h3>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Tytuł"
        required
      /><br />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Opis"
        required
      /><br />
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Kategoria"
        required
      /><br />
      <input
        type="number"
        name="startingPrice"
        value={form.startingPrice}
        onChange={handleChange}
        placeholder="Cena początkowa"
        step="0.01"
        min="0.01"
        required
      /><br />
      <input
        type="datetime-local"
        name="endTime"
        value={form.endTime}
        onChange={handleChange}
        required
      /><br />
      <button type="submit">Dodaj</button>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
    </form>
  );
};

export default AuctionForm;
