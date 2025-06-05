using System.Text.Json.Serialization;

namespace AuctionSystemAPI.Models
{
    public class Bid
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }

        public int AuctionId { get; set; }
        [JsonIgnore]
        public AuctionItem? Auction { get; set; }

        public int BidderId { get; set; }
        [JsonIgnore]
        public User? Bidder { get; set; }

        public DateTimeOffset BidTime { get; set; } = DateTimeOffset.UtcNow;
    }
}
