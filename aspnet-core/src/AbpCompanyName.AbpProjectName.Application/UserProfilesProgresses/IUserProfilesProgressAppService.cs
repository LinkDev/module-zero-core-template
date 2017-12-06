using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserProfilesProgresses.Dto;

namespace AbpCompanyName.AbpProjectName.UserProfilesProgresses
{
	public interface IUserProfilesProgressAppService : IFilteredAppService<UserProfilesProgressDto, Guid, FilteredResultRequestDto>
	{
		
	}
}