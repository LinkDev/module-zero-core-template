using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.RandomizedRegularData.Dto;

namespace AbpCompanyName.AbpProjectName.RandomizedRegularData
{
	public class RandomizedRegularDatumAppService : AsyncFilteredAppService<RandomizedRegularDatum, RandomizedRegularDatumDto, int, FilteredResultRequestDto>, IRandomizedRegularDatumAppService
	{
		public RandomizedRegularDatumAppService(IRepository<RandomizedRegularDatum, int> repository)
            : base(repository)
        {
			this.DefaultSort = "Id ASC";
		}

	}
}