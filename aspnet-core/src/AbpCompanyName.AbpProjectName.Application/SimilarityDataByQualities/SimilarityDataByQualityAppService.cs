using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SimilarityDataByQualities.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityDataByQualities
{
	public class SimilarityDataByQualityAppService : AsyncFilteredAppService<SimilarityDataByQuality, SimilarityDataByQualityDto, Guid, FilteredResultRequestDto>, ISimilarityDataByQualityAppService
	{
		public SimilarityDataByQualityAppService(IRepository<SimilarityDataByQuality, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainName ASC";
		}

	}
}