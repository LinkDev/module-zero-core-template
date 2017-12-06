using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireQuestions.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestions
{
	public class QuestionnaireQuestionAppService : AsyncFilteredAppService<QuestionnaireQuestion, QuestionnaireQuestionDto, Guid, FilteredResultRequestDto>, IQuestionnaireQuestionAppService
	{
		public QuestionnaireQuestionAppService(IRepository<QuestionnaireQuestion, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Title ASC";
		}

		protected override IQueryable<QuestionnaireQuestion> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Questionnaire
			);
        }
	}
}