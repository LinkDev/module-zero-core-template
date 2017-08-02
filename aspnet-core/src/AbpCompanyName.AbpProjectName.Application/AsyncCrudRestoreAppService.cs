using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Application.Services.Dto;

namespace Abp.Application.Services
{
    public class AsyncCrudRestoreAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput> :
        AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput>,
        IRestoreDeletedAppService<TEntity,TEntityDto, TPrimaryKey, TGetAllInput>
        where TEntity : class, Abp.Domain.Entities.IEntity<TPrimaryKey>, Abp.Domain.Entities.ISoftDelete
        where TEntityDto : Abp.Application.Services.Dto.IEntityDto<TPrimaryKey>
    {
        public AsyncCrudRestoreAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
        }

        public async Task<PagedResultDto<TEntityDto>> GetAllDeleted(TGetAllInput input)
        {
            CheckGetAllPermission();

            IQueryable<TEntity> query;
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                query = Repository.GetAllList().Where(x => x.IsDeleted == true).AsQueryable();
            }

            var totalCount = query.Count();

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = query.ToList();

            return new PagedResultDto<TEntityDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }


        public virtual async Task<TEntityDto> Restore(TPrimaryKey Id)
        {
            var entity = await GetEntityByIdAsync(Id);
            entity.IsDeleted = false;
            
            return await Update(MapToEntityDto(entity));
            
        }
    }
}
