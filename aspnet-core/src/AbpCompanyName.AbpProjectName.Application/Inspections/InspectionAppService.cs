using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Inspections.Dto;

namespace AbpCompanyName.AbpProjectName.Inspections
{
	public class InspectionAppService : AsyncFilteredAppService<Inspection, InspectionDto, Guid, FilteredResultRequestDto>, IInspectionAppService
	{
		public InspectionAppService(IRepository<Inspection, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "InspectorId ASC";
		}

		protected override IQueryable<Inspection> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Phase, 
				e => e.Domain
			);
        }
	}
}