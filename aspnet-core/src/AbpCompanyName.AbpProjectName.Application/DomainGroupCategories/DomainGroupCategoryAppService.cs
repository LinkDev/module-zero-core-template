using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainGroupCategories.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroupCategories
{
	public class DomainGroupCategoryAppService : AsyncFilteredAppService<DomainGroupCategory, DomainGroupCategoryDto, Guid, FilteredResultRequestDto>, IDomainGroupCategoryAppService
	{
		public DomainGroupCategoryAppService(IRepository<DomainGroupCategory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}