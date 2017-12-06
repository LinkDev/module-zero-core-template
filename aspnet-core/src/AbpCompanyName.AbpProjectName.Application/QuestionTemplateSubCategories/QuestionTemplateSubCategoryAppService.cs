using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateSubCategories.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateSubCategories
{
	public class QuestionTemplateSubCategoryAppService : AsyncFilteredAppService<QuestionTemplateSubCategory, QuestionTemplateSubCategoryDto, Guid, FilteredResultRequestDto>, IQuestionTemplateSubCategoryAppService
	{
		public QuestionTemplateSubCategoryAppService(IRepository<QuestionTemplateSubCategory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<QuestionTemplateSubCategory> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.QuestionTemplateCategory
			);
        }
	}
}