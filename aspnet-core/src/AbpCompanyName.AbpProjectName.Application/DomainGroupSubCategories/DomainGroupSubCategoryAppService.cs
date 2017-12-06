using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainGroupSubCategories.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroupSubCategories
{
	public class DomainGroupSubCategoryAppService : AsyncFilteredAppService<DomainGroupSubCategory, DomainGroupSubCategoryDto, Guid, FilteredResultRequestDto>, IDomainGroupSubCategoryAppService
	{
		public DomainGroupSubCategoryAppService(IRepository<DomainGroupSubCategory, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<DomainGroupSubCategory> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.DomainGroupCategory
			);
        }
	}
}