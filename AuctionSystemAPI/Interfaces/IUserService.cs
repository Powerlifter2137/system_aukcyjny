using AuctionSystemAPI.Models;

namespace AuctionSystemAPI.Interfaces
{
    public interface IUserService
    {
        Task<User> Create(User user);
        Task<User?> Get(int id);
        Task<IEnumerable<User>> GetAll();
        Task<User?> Update(int id, User user);
        Task<bool> Delete(int id);
    }
}
