using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainGroupSubCategories.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroupSubCategories
{
	public interface IDomainGroupSubCategoryAppService : IFilteredAppService<DomainGroupSubCategoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}