using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireExamResults.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireExamResults
{
	public interface IQuestionnaireExamResultAppService : IFilteredAppService<QuestionnaireExamResultDto, Guid, FilteredResultRequestDto>
	{
		
	}
}