using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireQuestionAnswers.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestionAnswers
{
	public class QuestionnaireQuestionAnswerAppService : AsyncFilteredAppService<QuestionnaireQuestionAnswer, QuestionnaireQuestionAnswerDto, Guid, FilteredResultRequestDto>, IQuestionnaireQuestionAnswerAppService
	{
		public QuestionnaireQuestionAnswerAppService(IRepository<QuestionnaireQuestionAnswer, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Title ASC";
		}

		protected override IQueryable<QuestionnaireQuestionAnswer> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Question
			);
        }
	}
}