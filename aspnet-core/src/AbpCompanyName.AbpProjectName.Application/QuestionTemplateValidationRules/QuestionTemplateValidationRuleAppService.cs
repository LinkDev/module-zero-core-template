using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateValidationRules.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateValidationRules
{
	public class QuestionTemplateValidationRuleAppService : AsyncFilteredAppService<QuestionTemplateValidationRule, QuestionTemplateValidationRuleDto, Guid, FilteredResultRequestDto>, IQuestionTemplateValidationRuleAppService
	{
		public QuestionTemplateValidationRuleAppService(IRepository<QuestionTemplateValidationRule, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "ErrorMessage ASC";
		}

		protected override IQueryable<QuestionTemplateValidationRule> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.QuestionTemplate
			);
        }
	}
}