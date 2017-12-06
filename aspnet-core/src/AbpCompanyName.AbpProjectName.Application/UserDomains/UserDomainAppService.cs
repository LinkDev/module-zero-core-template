using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserDomains.Dto;

namespace AbpCompanyName.AbpProjectName.UserDomains
{
	public class UserDomainAppService : AsyncFilteredAppService<UserDomain, UserDomainDto, Guid, FilteredResultRequestDto>, IUserDomainAppService
	{
		public UserDomainAppService(IRepository<UserDomain, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<UserDomain> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Domain, 
				e => e.Application
			);
        }
	}
}