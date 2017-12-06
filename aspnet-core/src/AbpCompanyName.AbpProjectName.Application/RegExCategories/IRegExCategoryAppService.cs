using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.RegExCategories.Dto;

namespace AbpCompanyName.AbpProjectName.RegExCategories
{
	public interface IRegExCategoryAppService : IFilteredAppService<RegExCategoryDto, Guid, FilteredResultRequestDto>
	{
		
	}
}