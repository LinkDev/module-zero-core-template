using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UsersActiveDomains.Dto;

namespace AbpCompanyName.AbpProjectName.UsersActiveDomains
{
	public class UsersActiveDomainAppService : AsyncFilteredAppService<UsersActiveDomain, UsersActiveDomainDto, Guid, FilteredResultRequestDto>, IUsersActiveDomainAppService
	{
		public UsersActiveDomainAppService(IRepository<UsersActiveDomain, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

	}
}