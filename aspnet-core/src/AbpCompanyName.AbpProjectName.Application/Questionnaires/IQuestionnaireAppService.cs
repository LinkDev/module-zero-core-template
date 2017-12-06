using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Questionnaires.Dto;

namespace AbpCompanyName.AbpProjectName.Questionnaires
{
	public interface IQuestionnaireAppService : IFilteredAppService<QuestionnaireDto, Guid, FilteredResultRequestDto>
	{
		
	}
}