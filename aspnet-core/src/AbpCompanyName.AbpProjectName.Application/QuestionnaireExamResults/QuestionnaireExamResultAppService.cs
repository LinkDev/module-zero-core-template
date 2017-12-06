using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireExamResults.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireExamResults
{
	public class QuestionnaireExamResultAppService : AsyncFilteredAppService<QuestionnaireExamResult, QuestionnaireExamResultDto, Guid, FilteredResultRequestDto>, IQuestionnaireExamResultAppService
	{
		public QuestionnaireExamResultAppService(IRepository<QuestionnaireExamResult, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<QuestionnaireExamResult> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Questionnaire
			);
        }
	}
}