

using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Authentication_Demo_Project.Model.DbEntities;
using Authentication_Demo_Project.Token.Interface;

namespace Authentication_Demo_Project.Token.Core
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DbSet<T> DbSet { get; set; }
        private DbContext Context { get; set; }

        public Repository(UserContext userContext)
        {
            Context = userContext;
            DbSet = Context.Set<T>();
        }
        public async Task<T> SingleOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await DbSet.AsNoTracking().SingleOrDefaultAsync(predicate);
        }
        public async Task<IEnumerable<T>> AllAsync()
        {
            return await DbSet.AsNoTracking().ToListAsync();
        }
        public Task AddAsync(T entity)
        {
            var dbEntityEntry = Context.Entry(entity);
            if(dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                 DbSet.Add(entity);
            }
            return Task.CompletedTask;
        }
        public Task UpdateAsync(T entity)
        {
            var dbEntityEntry = Context.Entry(entity);
            if(dbEntityEntry.State == EntityState.Detached)
            {
                var dbSet = Context.Set<T>();
                dbSet.Attach(entity);
            }
            setEntryState(entity, EntityState.Modified);
            return Task.CompletedTask;
        }
        public Task DeleteAsync(T entity)
        {
            DbSet.Remove(entity);
            setEntryState(entity, EntityState.Deleted);
            return Task.CompletedTask;
        }
        public async Task<int> SaveAsync()
        {
            return await Context.SaveChangesAsync();
        }

        private void setEntryState(T entity, EntityState state) 
        {
            Context.Entry(entity).State = state;
        }
    }
}
