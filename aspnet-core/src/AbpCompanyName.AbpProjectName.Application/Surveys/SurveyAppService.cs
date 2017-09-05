using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Surveys.Dto;

namespace AbpCompanyName.AbpProjectName.Surveys
{
	public class SurveyAppService : AsyncFilteredAppService<Survey, SurveyDto, Guid, FilteredResultRequestDto>, ISurveyAppService
	{
		public SurveyAppService(IRepository<Survey, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<Survey> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.ParentSurvey
			);
        }
	}
}