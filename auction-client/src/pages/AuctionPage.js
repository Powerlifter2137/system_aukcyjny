import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AuctionPage = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:5000/api/auctions/${id}`)
      .then((res) => res.json())
      .then(setAuction);

    fetch(`http://localhost:5000/api/auctions/${id}/bids`)
      .then((res) => res.json())
      .then(setBids);
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch(`http://localhost:5000/api/auctions/${id}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
      }),
    });

    if (response.ok) {
      const newBid = await response.json();
      setBids((prev) => [newBid, ...prev]);
      setAmount('');
    } else {
      const errText = await response.text();
      setError(errText || 'Błąd składania oferty');
    }
  };

  if (!auction) return <p>Ładowanie aukcji...</p>;

  const endDate = new Date(auction.endTime).toLocaleString();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{auction.title}</h2>
      <p>{auction.description}</p>
      <p><strong>Kategoria:</strong> {auction.category}</p>
      <p><strong>Cena startowa:</strong> {auction.startingPrice} zł</p>
      <p><strong>Koniec:</strong> {endDate}</p>
      <p><strong>Status:</strong> {auction.isClosed ? 'Zakończona' : 'Aktywna'}</p>

      {auction.isClosed && auction.winner ? (
        <p style={{ color: 'green' }}><strong>Zwycięzca:</strong> {auction.winner.username}</p>
      ) : auction.isClosed ? (
        <p style={{ color: 'orange' }}><strong>Brak zwycięzcy – brak ofert.</strong></p>
      ) : null}

      <hr />

      {!auction.isClosed && (
        <form onSubmit={handleBid}>
          <label>
            Twoja oferta (zł):{' '}
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <button type="submit">Licytuj</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Oferty:</h3>
      <ul>
        {bids.map((bid) => (
          <li key={bid.id}>
            {bid.amount} zł – {new Date(bid.bidTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionPage;
