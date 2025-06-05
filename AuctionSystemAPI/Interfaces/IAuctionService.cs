using AuctionSystemAPI.Models;

namespace AuctionSystemAPI.Interfaces
{
    public interface IAuctionService
    {
        Task<AuctionItem> Create(AuctionItem item);
        Task<AuctionItem?> Get(int id);
        Task<IEnumerable<AuctionItem>> GetAll();
        Task<AuctionItem?> Update(int id, AuctionItem item);
        Task<bool> Delete(int id);
        Task<AuctionItem?> GetAuctionById(int id);
    }
}
