using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SimilarityPercentages.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityPercentages
{
	public class SimilarityPercentageAppService : AsyncFilteredAppService<SimilarityPercentage, SimilarityPercentageDto, Guid, FilteredResultRequestDto>, ISimilarityPercentageAppService
	{
		public SimilarityPercentageAppService(IRepository<SimilarityPercentage, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "QualityResponseCode ASC";
		}

	}
}