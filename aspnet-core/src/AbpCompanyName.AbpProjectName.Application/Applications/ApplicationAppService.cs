using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Applications.Dto;

namespace AbpCompanyName.AbpProjectName.Applications
{
	public class ApplicationAppService : AsyncFilteredAppService<Application, ApplicationDto, Guid, FilteredResultRequestDto>, IApplicationAppService
	{
		public ApplicationAppService(IRepository<Application, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<Application> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.CurrentPhase, 
				e => e.Category
			);
        }
	}
}