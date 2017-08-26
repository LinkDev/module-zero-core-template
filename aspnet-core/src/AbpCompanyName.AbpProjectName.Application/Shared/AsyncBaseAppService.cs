using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abp.Application.Services
{
    /// <summary>
    /// Base class that add basic fixes to all Crud app services
    /// </summary>
    public class AsyncBaseAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> :
        AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>,
        IAsyncCrudAppService<TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>
           where TEntity : class, IEntity<TPrimaryKey>
           where TEntityDto : IEntityDto<TPrimaryKey>
           where TUpdateInput : IEntityDto<TPrimaryKey>
           where TGetInput : IEntityDto<TPrimaryKey>
           where TDeleteInput : IEntityDto<TPrimaryKey>
           where TGetAllInput : IFilteredResultRequest
    {
        /// <summary>
        /// The default sort to be used when no sort parameter is passed to GetAll
        /// </summary>
        public virtual string DefaultSort { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repository"></param>
        public AsyncBaseAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {

        }

        /// <summary>
        /// This method abstract the GetAll queryable method to allow children to override and add includes without messing with the CreateFilteredQuery method
        /// </summary>
        /// <returns></returns>
        protected virtual IQueryable<TEntity> CreateQuery()
        {
            return Repository.GetAll();
        }

        /// <summary>
        /// Override GetEntityByIdAsync to use CreateQuery to get with includes
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected async override Task<TEntity> GetEntityByIdAsync(TPrimaryKey id)
        {
            var query = CreateQuery().Where(e => e.Id.Equals(id));
            var obj = await AsyncQueryableExecuter.FirstOrDefaultAsync(query);
            return obj;
        }

        /// <summary>
        /// Override apply sorting to provide default sorting behavior
        /// </summary>
        /// <param name="query"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        protected override IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query, TGetAllInput input)
        {
            //Use default sorting if no sorting provided
            var sortInput = input as ISortedResultRequest;
            if (sortInput != null)
            {
                if (string.IsNullOrEmpty(sortInput.Sorting) && !string.IsNullOrEmpty(DefaultSort))
                    sortInput.Sorting = DefaultSort;
            }

            return base.ApplySorting(query, input);
        }

        /// <summary>
        /// Fixes DB collection after mapping
        /// </summary>
        /// <param name="fromCollection"></param>
        /// <param name="toCollection"></param>
        protected void UpdateCollection(IList fromCollection, IList toCollection)
        {
            foreach (var item in fromCollection)
            {
                int i = toCollection.IndexOf(item);
                if (i >= 0)
                {
                    ObjectMapper.Map(toCollection[i], item);
                    toCollection.RemoveAt(i);
                    toCollection.Insert(i, item);
                }
            }
        }
    }
}
