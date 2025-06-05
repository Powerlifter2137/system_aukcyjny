using AuctionSystemAPI.Data;
using AuctionSystemAPI.Models;
using AuctionSystemAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystemAPI.Services {
    public class BidService : IBidService {
        private readonly AppDbContext _context;

        public BidService(AppDbContext context) => _context = context;

        public async Task<Bid> PlaceBid(Bid bid) {
            // Sprawdź czy aukcja istnieje
            var auction = await _context.AuctionItems
                .Include(a => a.Bids)
                .FirstOrDefaultAsync(a => a.Id == bid.AuctionId);

            if (auction == null)
                throw new InvalidOperationException("Aukcja nie istnieje");

            if (auction.IsClosed)
                throw new InvalidOperationException("Aukcja została zakończona");

            // Najwyższa obecna oferta
            var highestBid = auction.Bids.OrderByDescending(b => b.Amount).FirstOrDefault();
            decimal minimum = highestBid?.Amount ?? auction.StartingPrice;

            if (bid.Amount <= minimum)
                throw new InvalidOperationException($"Oferta musi być wyższa niż {minimum} zł");

            bid.BidTime = DateTimeOffset.UtcNow;
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            return bid;
        }

            public async Task<IEnumerable<Bid>> GetBidsForAuction(int auctionId) {
            var bids = await _context.Bids
            .Where(b => b.AuctionId == auctionId)
            .ToListAsync();

            return bids.OrderByDescending(b => b.Amount);
        }
    }
}
