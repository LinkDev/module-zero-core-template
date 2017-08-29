using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Domains.Dto;

namespace AbpCompanyName.AbpProjectName.Domains
{
	public class DomainAppService : AsyncFilteredAppService<Domain, DomainDto, Guid, FilteredResultRequestDto>, IDomainAppService
	{
		public DomainAppService(IRepository<Domain, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<Domain> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.ParentDomain, 
				e => e.DomainGroup
			);
        }
	}
}