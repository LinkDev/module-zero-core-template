using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplates.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplates
{
	public interface IQuestionTemplateAppService : IFilteredAppService<QuestionTemplateDto, Guid, FilteredResultRequestDto>
	{
		
	}
}