using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuctionSystemAPI.Models;
using AuctionSystemAPI.Services;
using AuctionSystemAPI.Interfaces;

namespace AuctionSystemAPI.Controllers {
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase {
        private readonly IUserService _service;
        public UsersController(IUserService service) => _service = service;

        [HttpPost]
        public async Task<ActionResult<User>> Create(User user) => await _service.Create(user);

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id) {
            var user = await _service.Get(id);
            return user is null ? NotFound() : Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll() => Ok(await _service.GetAll());

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Update(int id, User user) {
            var updated = await _service.Update(id, user);
            return updated is null ? NotFound() : Ok(updated);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id) {
            var success = await _service.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
