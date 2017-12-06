using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserApplications.Dto;

namespace AbpCompanyName.AbpProjectName.UserApplications
{
	public interface IUserApplicationAppService : IFilteredAppService<UserApplicationDto, string, FilteredResultRequestDto>
	{
		
	}
}