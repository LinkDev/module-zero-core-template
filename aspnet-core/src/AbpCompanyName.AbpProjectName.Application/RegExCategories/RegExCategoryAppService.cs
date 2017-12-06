using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.RegExCategories.Dto;

namespace AbpCompanyName.AbpProjectName.RegExCategories
{
	public class RegExCategoryAppService : AsyncFilteredAppService<RegExCategory, RegExCategoryDto, Guid, FilteredResultRequestDto>, IRegExCategoryAppService
	{
		public RegExCategoryAppService(IRepository<RegExCategory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}