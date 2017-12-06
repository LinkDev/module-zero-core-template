using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Questionnaires.Dto;

namespace AbpCompanyName.AbpProjectName.Questionnaires
{
	public class QuestionnaireAppService : AsyncFilteredAppService<Questionnaire, QuestionnaireDto, Guid, FilteredResultRequestDto>, IQuestionnaireAppService
	{
		public QuestionnaireAppService(IRepository<Questionnaire, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Title ASC";
		}

		protected override IQueryable<Questionnaire> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Phase
			);
        }
	}
}