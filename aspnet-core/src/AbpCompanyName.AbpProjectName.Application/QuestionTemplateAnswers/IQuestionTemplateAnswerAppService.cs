using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateAnswers.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateAnswers
{
	public interface IQuestionTemplateAnswerAppService : IFilteredAppService<QuestionTemplateAnswerDto, Guid, FilteredResultRequestDto>
	{
		
	}
}