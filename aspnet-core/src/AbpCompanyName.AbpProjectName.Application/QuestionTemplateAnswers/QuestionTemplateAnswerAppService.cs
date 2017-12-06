using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionTemplateAnswers.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateAnswers
{
	public class QuestionTemplateAnswerAppService : AsyncFilteredAppService<QuestionTemplateAnswer, QuestionTemplateAnswerDto, Guid, FilteredResultRequestDto>, IQuestionTemplateAnswerAppService
	{
		public QuestionTemplateAnswerAppService(IRepository<QuestionTemplateAnswer, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<QuestionTemplateAnswer> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.QuestionTemplate
			);
        }
	}
}