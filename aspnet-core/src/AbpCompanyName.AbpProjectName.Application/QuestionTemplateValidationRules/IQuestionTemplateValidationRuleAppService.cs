using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateValidationRules.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateValidationRules
{
	public interface IQuestionTemplateValidationRuleAppService : IFilteredAppService<QuestionTemplateValidationRuleDto, Guid, FilteredResultRequestDto>
	{
		
	}
}