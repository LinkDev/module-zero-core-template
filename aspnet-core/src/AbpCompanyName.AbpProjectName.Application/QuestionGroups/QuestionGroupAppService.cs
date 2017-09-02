using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionGroups.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionGroups
{
	public class QuestionGroupAppService : AsyncFilteredAppService<QuestionGroup, QuestionGroupDto, Guid, FilteredResultRequestDto>, IQuestionGroupAppService
	{
		public QuestionGroupAppService(IRepository<QuestionGroup, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<QuestionGroup> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Survey
			);
        }
	}
}