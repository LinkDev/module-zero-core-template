using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainSettings.Dto;

namespace AbpCompanyName.AbpProjectName.DomainSettings
{
	public interface IDomainSettingAppService : IFilteredAppService<DomainSettingDto, Guid, FilteredResultRequestDto>
	{
		
	}
}