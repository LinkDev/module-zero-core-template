using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UsersActiveDomains.Dto;

namespace AbpCompanyName.AbpProjectName.UsersActiveDomains
{
	public interface IUsersActiveDomainAppService : IFilteredAppService<UsersActiveDomainDto, Guid, FilteredResultRequestDto>
	{
		
	}
}