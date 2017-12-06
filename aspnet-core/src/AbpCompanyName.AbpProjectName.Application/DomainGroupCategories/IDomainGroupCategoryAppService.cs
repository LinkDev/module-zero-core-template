using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainGroupCategories.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroupCategories
{
	public interface IDomainGroupCategoryAppService : IFilteredAppService<DomainGroupCategoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}