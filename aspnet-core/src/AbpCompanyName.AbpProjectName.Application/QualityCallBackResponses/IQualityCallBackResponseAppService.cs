using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QualityCallBackResponses.Dto;

namespace AbpCompanyName.AbpProjectName.QualityCallBackResponses
{
	public interface IQualityCallBackResponseAppService : IFilteredAppService<QualityCallBackResponseDto, int, FilteredResultRequestDto>
	{
		
	}
}