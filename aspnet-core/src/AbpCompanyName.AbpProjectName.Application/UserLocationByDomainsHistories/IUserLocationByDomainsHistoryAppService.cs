using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserLocationByDomainsHistories.Dto;

namespace AbpCompanyName.AbpProjectName.UserLocationByDomainsHistories
{
	public interface IUserLocationByDomainsHistoryAppService : IFilteredAppService<UserLocationByDomainsHistoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}