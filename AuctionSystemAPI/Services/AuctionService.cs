using AuctionSystemAPI.Data;
using AuctionSystemAPI.Models;
using AuctionSystemAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystemAPI.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly AppDbContext _context;

        public AuctionService(AppDbContext context) => _context = context;

        public async Task<AuctionItem> Create(AuctionItem item)
        {
            item.IsClosed = false;
            _context.AuctionItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<AuctionItem?> Get(int id)
        {
            var item = await _context.AuctionItems
                .Include(a => a.Winner)
                .Include(a => a.Bids)
                .FirstOrDefaultAsync(a => a.Id == id);

            await CheckAndCloseAuction(item);
            return item;
        }

        public async Task<AuctionItem?> GetAuctionById(int id)
        {
            return await Get(id);
        }

        public async Task<IEnumerable<AuctionItem>> GetAll()
        {
            var items = await _context.AuctionItems
                .Include(a => a.Winner)
                .ToListAsync();

            foreach (var item in items)
                await CheckAndCloseAuction(item);

            return items;
        }

        public async Task<AuctionItem?> Update(int id, AuctionItem item)
        {
            var existing = await _context.AuctionItems.FindAsync(id);
            if (existing == null || existing.IsClosed || existing.OwnerId != item.OwnerId)
                return null;

            existing.Title = item.Title;
            existing.Description = item.Description;
            existing.Category = item.Category;
            existing.StartingPrice = item.StartingPrice;
            existing.EndTime = item.EndTime;
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.AuctionItems.FindAsync(id);
            if (item == null) return false;

            _context.AuctionItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id, int userId)
        {
            var existing = await _context.AuctionItems.FindAsync(id);
            if (existing == null || existing.IsClosed || existing.OwnerId != userId)
                return false;

            _context.AuctionItems.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> CloseExpiredAuctions()
        {
            var now = DateTime.UtcNow;
            var expired = await _context.AuctionItems
                .Where(a => !a.IsClosed && a.EndTime < now)
                .ToListAsync();

            foreach (var a in expired)
            {
                a.IsClosed = true;

                var highestBid = await _context.Bids
                    .Where(b => b.AuctionId == a.Id)
                    .OrderByDescending(b => b.Amount)
                    .FirstOrDefaultAsync();

                if (highestBid != null)
                {
                    a.WinnerId = highestBid.BidderId;
                    a.Winner = await _context.Users.FindAsync(highestBid.BidderId);
                }
            }

            await _context.SaveChangesAsync();
            return expired.Count;
        }

        private async Task CheckAndCloseAuction(AuctionItem? item)
        {
            if (item == null || item.IsClosed || item.EndTime > DateTime.UtcNow)
                return;

            item.IsClosed = true;

            var highestBid = await _context.Bids
                .Where(b => b.AuctionId == item.Id)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();

            if (highestBid != null)
            {
                item.WinnerId = highestBid.BidderId;
                item.Winner = await _context.Users.FindAsync(highestBid.BidderId);
            }

            await _context.SaveChangesAsync();
        }
    }
}
