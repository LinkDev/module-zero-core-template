using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;

namespace Abp.Application.Services
{
    public class AsyncFilteredRestoreDeletedAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput> :
        AsyncFilteredRestoreDeletedAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TEntityDto, TEntityDto, EntityDto<TPrimaryKey>, EntityDto<TPrimaryKey>>,
        IFilteredRestoreDeletedAppService<TEntityDto, TPrimaryKey, TGetAllInput, TEntityDto, TEntityDto, EntityDto<TPrimaryKey>, EntityDto<TPrimaryKey>>
           where TEntity : class, IEntity<TPrimaryKey>, ISoftDelete
           where TEntityDto : IEntityDto<TPrimaryKey>
           where TGetAllInput : IFilteredResultRequest
    {
        public AsyncFilteredRestoreDeletedAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
        }
    }

    public class AsyncFilteredRestoreDeletedAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> :
        AsyncFilteredAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>,
        IFilteredRestoreDeletedAppService<TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>
           where TEntity : class, IEntity<TPrimaryKey>, ISoftDelete
           where TEntityDto : IEntityDto<TPrimaryKey>
           where TUpdateInput : IEntityDto<TPrimaryKey>
           where TGetInput : IEntityDto<TPrimaryKey>
           where TDeleteInput : IEntityDto<TPrimaryKey>
           where TGetAllInput : IFilteredResultRequest
    {
        public AsyncFilteredRestoreDeletedAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
        }

        public async Task<PagedResultDto<TEntityDto>> GetAllDeleted(TGetAllInput input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                CheckGetAllPermission();

                var query = CreateFilteredQuery(input).Where(x => x.IsDeleted == true);

                var totalCount = query.Count();

                query = ApplySorting(query, input);
                query = ApplyPaging(query, input);

                var entities = await AsyncQueryableExecuter.ToListAsync(query);

                return new PagedResultDto<TEntityDto>(
                    totalCount,
                    entities.Select(MapToEntityDto).ToList()
                );
            }
        }

        public virtual async Task<TEntityDto> Restore(TPrimaryKey Id)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                CheckUpdatePermission();

                var entity = await GetEntityByIdAsync(Id);

                entity.IsDeleted = false;

                await CurrentUnitOfWork.SaveChangesAsync();

                return MapToEntityDto(entity);
            }
        }
    }
}
