using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserLocationByDomains.Dto;

namespace AbpCompanyName.AbpProjectName.UserLocationByDomains
{
	public class UserLocationByDomainAppService : AsyncFilteredAppService<UserLocationByDomain, UserLocationByDomainDto, Guid, FilteredResultRequestDto>, IUserLocationByDomainAppService
	{
		public UserLocationByDomainAppService(IRepository<UserLocationByDomain, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainName ASC";
		}

	}
}