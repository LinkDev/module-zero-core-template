using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireQuestions.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestions
{
	public interface IQuestionnaireQuestionAppService : IFilteredAppService<QuestionnaireQuestionDto, Guid, FilteredResultRequestDto>
	{
		
	}
}