using Authentication_Demo_Project.Token.core;

using Microsoft.EntityFrameworkCore;

namespace Authentication_Demo_Project.Model.DbEntities
{
    public interface IUserContext
    {
        DbSet<User> Users { get; set; }
        
    }
    public class UserContext : DbContext, IUserContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }
        public virtual DbSet<User> Users { get; set; }
        
    }
}
