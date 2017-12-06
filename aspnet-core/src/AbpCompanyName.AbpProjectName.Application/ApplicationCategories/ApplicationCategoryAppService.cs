using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApplicationCategories.Dto;

namespace AbpCompanyName.AbpProjectName.ApplicationCategories
{
	public class ApplicationCategoryAppService : AsyncFilteredAppService<ApplicationCategory, ApplicationCategoryDto, Guid, FilteredResultRequestDto>, IApplicationCategoryAppService
	{
		public ApplicationCategoryAppService(IRepository<ApplicationCategory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}