using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuctionSystemAPI.Models;
using AuctionSystemAPI.Services;
using AuctionSystemAPI.Interfaces;
using System.Security.Claims;

namespace AuctionSystemAPI.Controllers
{
    [ApiController]
    [Route("api/auctions/{auctionId}/bids")]
    public class BidsController : ControllerBase
    {
        private readonly IBidService _service;
        private readonly IAuctionService _auctionService;

        public BidsController(IBidService service, IAuctionService auctionService)
        {
            _service = service;
            _auctionService = auctionService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Bid>> PlaceBid(int auctionId, Bid bid)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            // Pobierz aukcję
            var auction = await _auctionService.GetAuctionById(auctionId);
            if (auction == null)
                return NotFound("Aukcja nie istnieje.");

            // Sprawdź czy zakończona
            if (auction.EndTime.HasValue && auction.EndTime <= DateTime.UtcNow)
                return BadRequest("Aukcja już się zakończyła.");

            bid.AuctionId = auctionId;
            bid.BidderId = userId;

            var result = await _service.PlaceBid(bid);
            return CreatedAtAction(nameof(GetBids), new { auctionId }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bid>>> GetBids(int auctionId) =>
            Ok(await _service.GetBidsForAuction(auctionId));
    }
}
