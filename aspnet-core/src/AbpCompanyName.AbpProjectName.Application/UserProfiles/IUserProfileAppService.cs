using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserProfiles.Dto;

namespace AbpCompanyName.AbpProjectName.UserProfiles
{
	public interface IUserProfileAppService : IFilteredAppService<UserProfileDto, Guid, FilteredResultRequestDto>
	{
		
	}
}