using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.PhaseQuestions.Dto;

namespace AbpCompanyName.AbpProjectName.PhaseQuestions
{
	public class PhaseQuestionAppService : AsyncFilteredAppService<PhaseQuestion, PhaseQuestionDto, Guid, FilteredResultRequestDto>, IPhaseQuestionAppService
	{
		public PhaseQuestionAppService(IRepository<PhaseQuestion, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "QuestionId ASC";
		}

		protected override IQueryable<PhaseQuestion> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Phase, 
				e => e.Question
			);
        }
	}
}