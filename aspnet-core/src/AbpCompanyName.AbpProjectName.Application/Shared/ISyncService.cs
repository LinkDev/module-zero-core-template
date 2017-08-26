using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Abp.Application.Services
{
    public interface ISyncService<TEntityDto, TPrimaryKey>:IApplicationService
        where TEntityDto : ISyncable<TPrimaryKey>

    {
        IEnumerable<TEntityDto> Sync(IEnumerable<TEntityDto> postData, DateTime? lastUpdateTime);

        void SyncPaged();
    }
}
