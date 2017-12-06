using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserSurveysTemplates.Dto;

namespace AbpCompanyName.AbpProjectName.UserSurveysTemplates
{
	public class UserSurveysTemplateAppService : AsyncFilteredAppService<UserSurveysTemplate, UserSurveysTemplateDto, string, FilteredResultRequestDto>, IUserSurveysTemplateAppService
	{
		public UserSurveysTemplateAppService(IRepository<UserSurveysTemplate, string> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<UserSurveysTemplate> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Survey
			);
        }
	}
}