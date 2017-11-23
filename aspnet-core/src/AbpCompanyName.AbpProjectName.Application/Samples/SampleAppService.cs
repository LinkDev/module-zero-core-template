using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Samples.Dto;

namespace AbpCompanyName.AbpProjectName.Samples
{
	public class SampleAppService : AsyncFilteredAppService<Sample, SampleDto, int, FilteredResultRequestDto>, ISampleAppService
	{
		public SampleAppService(IRepository<Sample, int> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}