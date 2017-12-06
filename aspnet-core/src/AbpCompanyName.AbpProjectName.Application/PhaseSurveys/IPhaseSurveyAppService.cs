using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.PhaseSurveys.Dto;

namespace AbpCompanyName.AbpProjectName.PhaseSurveys
{
	public interface IPhaseSurveyAppService : IFilteredAppService<PhaseSurveyDto, Guid, FilteredResultRequestDto>
	{
		
	}
}