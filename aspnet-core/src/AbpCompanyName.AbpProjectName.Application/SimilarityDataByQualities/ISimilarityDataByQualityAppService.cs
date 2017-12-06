using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SimilarityDataByQualities.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityDataByQualities
{
	public interface ISimilarityDataByQualityAppService : IFilteredAppService<SimilarityDataByQualityDto, Guid, FilteredResultRequestDto>
	{
		
	}
}