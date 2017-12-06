using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SimilarityDataByCallCenters.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityDataByCallCenters
{
	public class SimilarityDataByCallCenterAppService : AsyncFilteredAppService<SimilarityDataByCallCenter, SimilarityDataByCallCenterDto, Guid, FilteredResultRequestDto>, ISimilarityDataByCallCenterAppService
	{
		public SimilarityDataByCallCenterAppService(IRepository<SimilarityDataByCallCenter, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainName ASC";
		}

	}
}