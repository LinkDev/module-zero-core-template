using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QualityCallBackResponseAnswers.Dto;

namespace AbpCompanyName.AbpProjectName.QualityCallBackResponseAnswers
{
	public interface IQualityCallBackResponseAnswerAppService : IFilteredAppService<QualityCallBackResponseAnswerDto, int, FilteredResultRequestDto>
	{
		
	}
}