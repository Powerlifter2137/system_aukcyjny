using System.Text.Json.Serialization;

namespace AuctionSystemAPI.Models
{
    public class AuctionItem
    {
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public required string Category { get; set; }

        public decimal StartingPrice { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsClosed { get; set; } = false;

        public int OwnerId { get; set; }

        public User? Owner { get; set; }

        public List<Bid> Bids { get; set; } = new();

        public int? WinnerId { get; set; }

        public User? Winner { get; set; }
    }
}
