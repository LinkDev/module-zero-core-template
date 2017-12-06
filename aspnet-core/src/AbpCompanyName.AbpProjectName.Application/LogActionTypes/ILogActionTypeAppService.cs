using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.LogActionTypes.Dto;

namespace AbpCompanyName.AbpProjectName.LogActionTypes
{
	public interface ILogActionTypeAppService : IFilteredAppService<LogActionTypeDto, int, FilteredResultRequestDto>
	{
		
	}
}