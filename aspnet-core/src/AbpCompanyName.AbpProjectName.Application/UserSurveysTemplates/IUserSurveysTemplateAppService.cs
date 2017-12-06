using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UserSurveysTemplates.Dto;

namespace AbpCompanyName.AbpProjectName.UserSurveysTemplates
{
	public interface IUserSurveysTemplateAppService : IFilteredAppService<UserSurveysTemplateDto, string, FilteredResultRequestDto>
	{
		
	}
}