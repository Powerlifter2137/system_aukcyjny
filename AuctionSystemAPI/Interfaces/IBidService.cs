using AuctionSystemAPI.Models;

namespace AuctionSystemAPI.Interfaces
{
    public interface IBidService
    {
        Task<Bid> PlaceBid(Bid bid);
        Task<IEnumerable<Bid>> GetBidsForAuction(int auctionId);
    }
}
