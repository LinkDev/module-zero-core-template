using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserLocationByDomains.Dto;

namespace AbpCompanyName.AbpProjectName.UserLocationByDomains
{
	public interface IUserLocationByDomainAppService : IFilteredAppService<UserLocationByDomainDto, Guid, FilteredResultRequestDto>
	{
		
	}
}