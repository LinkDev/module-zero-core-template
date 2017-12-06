using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateCategories.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateCategories
{
	public class QuestionTemplateCategoryAppService : AsyncFilteredAppService<QuestionTemplateCategory, QuestionTemplateCategoryDto, Guid, FilteredResultRequestDto>, IQuestionTemplateCategoryAppService
	{
		public QuestionTemplateCategoryAppService(IRepository<QuestionTemplateCategory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}