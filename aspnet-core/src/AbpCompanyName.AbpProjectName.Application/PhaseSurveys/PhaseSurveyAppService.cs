using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.PhaseSurveys.Dto;

namespace AbpCompanyName.AbpProjectName.PhaseSurveys
{
	public class PhaseSurveyAppService : AsyncFilteredAppService<PhaseSurvey, PhaseSurveyDto, Guid, FilteredResultRequestDto>, IPhaseSurveyAppService
	{
		public PhaseSurveyAppService(IRepository<PhaseSurvey, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "SurveyId ASC";
		}

		protected override IQueryable<PhaseSurvey> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Phase, 
				e => e.Survey
			);
        }
	}
}