using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Regices.Dto;

namespace AbpCompanyName.AbpProjectName.Regices
{
	public class RegExAppService : AsyncFilteredAppService<RegEx, RegExDto, Guid, FilteredResultRequestDto>, IRegExAppService
	{
		public RegExAppService(IRepository<RegEx, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<RegEx> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Category
			);
        }
	}
}