using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.SimilarityDataByCallCenters.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityDataByCallCenters
{
	public interface ISimilarityDataByCallCenterAppService : IFilteredAppService<SimilarityDataByCallCenterDto, Guid, FilteredResultRequestDto>
	{
		
	}
}