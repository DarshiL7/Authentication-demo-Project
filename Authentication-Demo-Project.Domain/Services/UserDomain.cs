

using Authentication_Demo_Project.Domain;
using Authentication_Demo_Project.Token.core;
using Authentication_Demo_Project.Token.Interface;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Authentication_Demo_Project.Services
{
    public class UserDomain : IUserDomain
    {
        private IRepository<User> UserRepository { get; set; }
        public UserDomain(IRepository<User> repository)
        {
            UserRepository = repository;
        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await UserRepository.AllAsync();
        }

        public async Task<User> GetByAsync(int id)
        {
            
            return await UserRepository.SingleOrDefaultAsync(t => t.Id == id);
        }

        public async Task<User> CheckUserAsync(User user)
        {
            var checkUser = await UserRepository.SingleOrDefaultAsync(t => t.Username == user.Username && t.Password == user.Password);
            return checkUser;
        }

        public async Task<User> AddAsync(User user)
        {

            await UserRepository.AddAsync(user);
            await UserRepository.SaveAsync();
            return user;
        }

        public async Task UpdateAsync(User user)
        {
            await UserRepository.UpdateAsync(user);
            await UserRepository.SaveAsync();
            
        }

        public async Task DeleteAsync(User user)
        {
            await UserRepository.DeleteAsync(user);
            await UserRepository.SaveAsync();
        }
    }
}
