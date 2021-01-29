using Authentication_Demo_Project.Model.Models;
using Authentication_Demo_Project.Token.core;

using System.Threading.Tasks;

namespace Authentication_Demo_Project.Domain
{
    public interface IAuthenticationDomain
    {
        Task<User> GetByAsync(Authentication authentication);
    }
}
