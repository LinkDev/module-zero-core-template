using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserLocationByDomainsHistories.Dto;

namespace AbpCompanyName.AbpProjectName.UserLocationByDomainsHistories
{
	public class UserLocationByDomainsHistoryAppService : AsyncFilteredAppService<UserLocationByDomainsHistory, UserLocationByDomainsHistoryDto, Guid, FilteredResultRequestDto>, IUserLocationByDomainsHistoryAppService
	{
		public UserLocationByDomainsHistoryAppService(IRepository<UserLocationByDomainsHistory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainName ASC";
		}

	}
}