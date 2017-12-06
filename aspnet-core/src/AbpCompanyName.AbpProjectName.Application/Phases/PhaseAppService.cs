using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Phases.Dto;

namespace AbpCompanyName.AbpProjectName.Phases
{
	public class PhaseAppService : AsyncFilteredAppService<Phase, PhaseDto, Guid, FilteredResultRequestDto>, IPhaseAppService
	{
		public PhaseAppService(IRepository<Phase, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<Phase> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Application, 
				e => e.BaseDomainGroup, 
				e => e.DomainGroup
			);
        }
	}
}