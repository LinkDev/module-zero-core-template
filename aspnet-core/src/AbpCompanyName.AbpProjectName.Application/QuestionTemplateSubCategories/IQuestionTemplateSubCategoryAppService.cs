using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateSubCategories.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateSubCategories
{
	public interface IQuestionTemplateSubCategoryAppService : IFilteredAppService<QuestionTemplateSubCategoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}