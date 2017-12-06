using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireQuestionAnswers.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestionAnswers
{
	public interface IQuestionnaireQuestionAnswerAppService : IFilteredAppService<QuestionnaireQuestionAnswerDto, Guid, FilteredResultRequestDto>
	{
		
	}
}