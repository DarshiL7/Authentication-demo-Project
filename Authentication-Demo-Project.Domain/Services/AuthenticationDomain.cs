using Authentication_Demo_Project.Domain;

using Authentication_Demo_Project.Model.Models;
using Authentication_Demo_Project.Token.core;
using Authentication_Demo_Project.Token.Interface;

using Microsoft.Extensions.Options;

using System.Threading.Tasks;

namespace Authentication_Demo_Project.Services
{
    public class AuthenticationDomain : IAuthenticationDomain
    {
        private readonly AppSettings appSettings;
        private IRepository<User> UserRepository { get; set; }
        public AuthenticationDomain(IRepository<User> repository , IOptions<AppSettings> appSettings)
        {
            UserRepository = repository;
            this.appSettings = appSettings.Value;
        }


        public async Task<User> GetByAsync(Authentication authentication)
        {
            var getUser = await UserRepository.SingleOrDefaultAsync(t => t.Username == authentication.Username && t.Password == authentication.Password);

            return getUser;

        }

       

        
        
    }
}
