using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateCategories.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateCategories
{
	public interface IQuestionTemplateCategoryAppService : IFilteredAppService<QuestionTemplateCategoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}