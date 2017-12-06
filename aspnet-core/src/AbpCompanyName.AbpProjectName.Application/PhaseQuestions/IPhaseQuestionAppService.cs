using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.PhaseQuestions.Dto;

namespace AbpCompanyName.AbpProjectName.PhaseQuestions
{
	public interface IPhaseQuestionAppService : IFilteredAppService<PhaseQuestionDto, Guid, FilteredResultRequestDto>
	{
		
	}
}