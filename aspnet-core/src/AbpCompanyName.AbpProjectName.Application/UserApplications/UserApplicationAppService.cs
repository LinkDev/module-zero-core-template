using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserApplications.Dto;

namespace AbpCompanyName.AbpProjectName.UserApplications
{
	public class UserApplicationAppService : AsyncFilteredAppService<UserApplication, UserApplicationDto, string, FilteredResultRequestDto>, IUserApplicationAppService
	{
		public UserApplicationAppService(IRepository<UserApplication, string> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<UserApplication> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Application
			);
        }
	}
}