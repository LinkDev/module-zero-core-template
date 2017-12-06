using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SyncLogs.Dto;

namespace AbpCompanyName.AbpProjectName.SyncLogs
{
	public class SyncLogAppService : AsyncFilteredAppService<SyncLog, SyncLogDto, Guid, FilteredResultRequestDto>, ISyncLogAppService
	{
		public SyncLogAppService(IRepository<SyncLog, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

	}
}