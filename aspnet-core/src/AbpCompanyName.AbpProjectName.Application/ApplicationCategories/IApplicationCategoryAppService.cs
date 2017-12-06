using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApplicationCategories.Dto;

namespace AbpCompanyName.AbpProjectName.ApplicationCategories
{
	public interface IApplicationCategoryAppService : IFilteredAppService<ApplicationCategoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}