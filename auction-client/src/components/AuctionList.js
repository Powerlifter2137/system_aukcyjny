import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuctionForm from './AuctionForm';
import BidForm from './BidForm';
import BidsList from './BidsList';

const AuctionList = ({ token }) => {
  const [auctions, setAuctions] = useState([]);

  const fetchAuctions = () => {
    axios.get('http://localhost:5000/api/auctions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAuctions(res.data))
      .catch(err => console.error('Błąd przy pobieraniu aukcji:', err));
  };

  useEffect(() => {
    fetchAuctions();
    const interval = setInterval(fetchAuctions, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auctions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAuctions();
    } catch (err) {
      console.error('Błąd przy usuwaniu aukcji:', err);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pl-PL', {
      timeZone: 'Europe/Warsaw',
      dateStyle: 'short',
      timeStyle: 'medium'
    });
  };

  return (
    <div>
      <h2>Lista aukcji</h2>
      <AuctionForm onAuctionAdded={fetchAuctions} token={token} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {auctions.map(auction => {
          const now = new Date();
          const endTime = new Date(auction.endTime);
          const hasEnded = auction.isClosed || (auction.endTime && endTime < now);

          // Oblicz najwyższą ofertę albo użyj ceny początkowej
          const currentPrice = auction.bids?.length > 0
            ? Math.max(...auction.bids.map(b => b.amount))
            : auction.startingPrice;

          return (
            <li key={auction.id} style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <strong>{auction.title}</strong> ({auction.category})<br />
              <em>{auction.description}</em><br />
              Cena startowa: {auction.startingPrice} zł<br />
              {auction.endTime && (
                <>Zakończenie licytacji: <strong>{formatDateTime(auction.endTime)}</strong><br /></>
              )}

              {/* Info o zakończeniu aukcji i zwycięzcy */}
              {hasEnded && (
                <p style={{ color: 'gray', marginTop: '8px' }}>
                  ⏱ Aukcja zakończona.
                  {auction.winner ? (
                    <span style={{ color: 'green' }}> Wygrał użytkownik <strong>{auction.winner.username}</strong></span>
                  ) : (
                    <span> Brak zwycięzcy.</span>
                  )}
                </p>
              )}

              {/* Formularz składania oferty (jeśli aukcja trwa) */}
              {!hasEnded && (
                <div style={{ marginTop: '10px' }}>
                  <h4>Złóż ofertę</h4>
                  <BidForm
                    auctionId={auction.id}
                    token={token}
                    currentPrice={currentPrice}
                    onBidPlaced={fetchAuctions}
                  />
                </div>
              )}

              <div>
                <h5>Oferty:</h5>
                <BidsList auctionId={auction.id} />
              </div>

              <button style={{ marginTop: '8px' }} onClick={() => handleDelete(auction.id)}>
                Usuń aukcję
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AuctionList;
