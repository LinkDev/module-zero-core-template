using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserProfilesProgresses.Dto;

namespace AbpCompanyName.AbpProjectName.UserProfilesProgresses
{
	public class UserProfilesProgressAppService : AsyncFilteredAppService<UserProfilesProgress, UserProfilesProgressDto, Guid, FilteredResultRequestDto>, IUserProfilesProgressAppService
	{
		public UserProfilesProgressAppService(IRepository<UserProfilesProgress, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserProfileId ASC";
		}

	}
}