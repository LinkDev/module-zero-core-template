using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.RandomizedRegularDataByDomains.Dto;

namespace AbpCompanyName.AbpProjectName.RandomizedRegularDataByDomains
{
	public class RandomizedRegularDataByDomainAppService : AsyncFilteredAppService<RandomizedRegularDataByDomain, RandomizedRegularDataByDomainDto, Guid, FilteredResultRequestDto>, IRandomizedRegularDataByDomainAppService
	{
		public RandomizedRegularDataByDomainAppService(IRepository<RandomizedRegularDataByDomain, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainCode ASC";
		}

	}
}