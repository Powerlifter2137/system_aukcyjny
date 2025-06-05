using AuctionSystemAPI.Models;
using AuctionSystemAPI.Data;
using AuctionSystemAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystemAPI.Services {
    public class UserService : IUserService {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context) => _context = context;

        public async Task<User> Create(User user) {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public Task<User?> Get(int id) => _context.Users.FindAsync(id).AsTask();

        public Task<IEnumerable<User>> GetAll() => Task.FromResult(_context.Users.AsEnumerable());

        public async Task<User?> Update(int id, User user) {
            var existing = await _context.Users.FindAsync(id);
            if (existing == null) return null;
            existing.Username = user.Username;
            existing.Email = user.Email;
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> Delete(int id) {
            var existing = await _context.Users.FindAsync(id);
            if (existing == null) return false;
            _context.Users.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}