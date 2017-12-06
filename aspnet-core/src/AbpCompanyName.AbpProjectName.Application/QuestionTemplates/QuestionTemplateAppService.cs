using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplates.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplates
{
	public class QuestionTemplateAppService : AsyncFilteredAppService<QuestionTemplate, QuestionTemplateDto, Guid, FilteredResultRequestDto>, IQuestionTemplateAppService
	{
		public QuestionTemplateAppService(IRepository<QuestionTemplate, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<QuestionTemplate> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.QuestionTemplateSubCategory
			);
        }
	}
}