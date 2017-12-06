using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SyncLogs.Dto;

namespace AbpCompanyName.AbpProjectName.SyncLogs
{
	public interface ISyncLogAppService : IFilteredAppService<SyncLogDto, Guid, FilteredResultRequestDto>
	{
		
	}
}