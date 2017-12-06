using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SimilarityPercentages.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityPercentages
{
	public interface ISimilarityPercentageAppService : IFilteredAppService<SimilarityPercentageDto, Guid, FilteredResultRequestDto>
	{
		
	}
}