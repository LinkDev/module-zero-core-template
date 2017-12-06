using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserDomains.Dto;

namespace AbpCompanyName.AbpProjectName.UserDomains
{
	public interface IUserDomainAppService : IFilteredAppService<UserDomainDto, Guid, FilteredResultRequestDto>
	{
		
	}
}