import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

const BidsList = ({ auctionId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auctions/${auctionId}/bids`)
      .then(res => {
        setBids(res.data);
      })
      .catch(err => console.error('Błąd przy pobieraniu ofert:', err));
  }, [auctionId]);

  const formatDate = (utcDate) => {
    if (!utcDate) return 'Brak daty';
    return DateTime.fromISO(utcDate, { zone: 'utc' })
      .setZone('Europe/Warsaw')
      .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  };

  if (bids.length === 0) {
    return <p>Brak ofert.</p>;
  }

  return (
    <ul>
      {bids.map(bid => (
        <li key={bid.id}>
          💰 {bid.amount} zł | użytkownik: {bid.bidderId} | {formatDate(bid.bidTime)}
        </li>
      ))}
    </ul>
  );
};

export default BidsList;
