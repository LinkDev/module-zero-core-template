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
	public class SampleAppService : AsyncFilteredAppService<Sample, SampleDto, Guid, FilteredResultRequestDto>, ISampleAppService
	{
		public SampleAppService(IRepository<Sample, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "CreateBy ASC";
		}

	}
}