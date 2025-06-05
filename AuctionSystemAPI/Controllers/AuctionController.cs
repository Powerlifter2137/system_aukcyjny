using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AuctionSystemAPI.Models;
using AuctionSystemAPI.Services;
using AuctionSystemAPI.Interfaces;
using System.Security.Claims;

namespace AuctionSystemAPI.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class AuctionsController : ControllerBase
    {
        private readonly IAuctionService _service;

        public AuctionsController(IAuctionService service) => _service = service;

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AuctionItem>> Create(AuctionItem item)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            item.OwnerId = userId;

            var result = await _service.Create(item);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionItem>> Get(int id)
        {
            var item = await _service.Get(id);
            return item is null ? NotFound() : Ok(item);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionItem>>> GetAll()
        {
            var all = await _service.GetAll();

            foreach (var auction in all)
            {
                if (auction.EndTime.HasValue && auction.EndTime <= DateTime.UtcNow)
                {
                    auction.IsClosed = true;
                }
            }

            return Ok(all);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<AuctionItem>> Update(int id, AuctionItem item)
        {
            var existing = await _service.Get(id);
            if (existing == null) return NotFound();

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (existing.OwnerId != userId)
                return Forbid("Nie masz uprawnień do edycji tej aukcji");

            var updated = await _service.Update(id, item);
            return Ok(updated);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var auction = await _service.Get(id);
            if (auction == null) return NotFound();

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (auction.OwnerId != userId)
                return Forbid("Nie masz uprawnień do usunięcia tej aukcji");

            var success = await _service.Delete(id);
            return success ? NoContent() : NotFound();
        }

        [HttpGet("by-id/{id}")]
        public async Task<ActionResult<AuctionItem>> GetAuctionById(int id)
        {
            var auction = await _service.Get(id);
            return auction is null ? NotFound() : Ok(auction);
        }
    }
}
