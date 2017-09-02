using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainGroups.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroups
{
	public interface IDomainGroupAppService : IFilteredAppService<DomainGroupDto, Guid, FilteredResultRequestDto>
	{
		
	}
}