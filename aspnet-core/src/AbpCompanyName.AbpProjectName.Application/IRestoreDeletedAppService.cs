using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abp.Application.Services
{
    public interface IRestoreDeletedAppService<TEntity,TEntityDto, TPrimaryKey, in TGetAllInput>
        where TEntityDto : Abp.Application.Services.Dto.IEntityDto<TPrimaryKey>
        where TEntity : class, Abp.Domain.Entities.IEntity<TPrimaryKey>, ISoftDelete
    {
        Task<PagedResultDto<TEntityDto>> GetAllDeleted(TGetAllInput input);

        Task<TEntityDto> Restore(TPrimaryKey Id);
    }
}
