using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Logs.Dto;

namespace AbpCompanyName.AbpProjectName.Logs
{
	public interface ILogAppService : IFilteredAppService<LogDto, Guid, FilteredResultRequestDto>
	{
		
	}
}