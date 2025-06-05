import React, { useState } from 'react';
import axios from 'axios';

const BidForm = ({ auctionId, onBidPlaced, token, currentPrice }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bidValue = parseFloat(amount);

    if (isNaN(bidValue)) {
      setError('Podaj prawidłową liczbę.');
      return;
    }

    if (bidValue <= currentPrice) {
      setError(`Oferta musi być wyższa niż ${currentPrice} zł.`);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/auctions/${auctionId}/bids`,
        { amount: bidValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onBidPlaced?.();
      setAmount('');
      setError('');
    } catch (err) {
      console.error('Błąd przy składaniu oferty:', err);
      setError('Błąd przy składaniu oferty. Spróbuj ponownie.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Kwota"
        step="0.01"
        min={currentPrice + 0.01}
        required
      />
      <button type="submit">Licytuj</button>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
    </form>
  );
};

export default BidForm;
