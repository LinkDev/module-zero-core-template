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
    public interface IFilteredRestoreDeletedAppService<TEntityDto, TPrimaryKey, in TGetAllInput>
        : IFilteredRestoreDeletedAppService<TEntityDto, TPrimaryKey, TGetAllInput, TEntityDto, TEntityDto, EntityDto<TPrimaryKey>, EntityDto<TPrimaryKey>>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TGetAllInput : IFilteredResultRequest
    { 
    }

    public interface IFilteredRestoreDeletedAppService<TEntityDto, TPrimaryKey, in TGetAllInput, in TCreateInput, in TUpdateInput, in TGetInput, in TDeleteInput>
        : IFilteredAppService<TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TUpdateInput : IEntityDto<TPrimaryKey>
        where TGetInput : IEntityDto<TPrimaryKey>
        where TDeleteInput : IEntityDto<TPrimaryKey>
        where TGetAllInput : IFilteredResultRequest
    {
        Task<PagedResultDto<TEntityDto>> GetAllDeleted(TGetAllInput input);

        Task<TEntityDto> Restore(TPrimaryKey Id);
    }
}
