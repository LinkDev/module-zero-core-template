using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainGroups.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroups
{
	public class DomainGroupAppService : AsyncFilteredAppService<DomainGroup, DomainGroupDto, Guid, FilteredResultRequestDto>, IDomainGroupAppService
	{
		public DomainGroupAppService(IRepository<DomainGroup, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<DomainGroup> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.SubCategory
			);
        }
	}
}