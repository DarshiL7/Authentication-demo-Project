using Authentication_Demo_Project.Token.core;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authentication_Demo_Project.Domain
{
    public interface IUserDomain
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> CheckUserAsync(User user);
        Task<User> GetByAsync(int id);
        Task<User> AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(User user);


    }
}
