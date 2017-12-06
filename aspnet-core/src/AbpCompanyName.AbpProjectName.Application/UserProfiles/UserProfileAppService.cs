using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserProfiles.Dto;

namespace AbpCompanyName.AbpProjectName.UserProfiles
{
	public class UserProfileAppService : AsyncFilteredAppService<UserProfile, UserProfileDto, Guid, FilteredResultRequestDto>, IUserProfileAppService
	{
		public UserProfileAppService(IRepository<UserProfile, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

	}
}