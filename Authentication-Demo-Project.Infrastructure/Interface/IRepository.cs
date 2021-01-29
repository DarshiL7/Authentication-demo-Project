using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Authentication_Demo_Project.Token.Interface
{
    public interface IRepository<T>
    {
        Task<T> SingleOrDefaultAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> AllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<int> SaveAsync();
    }
}
