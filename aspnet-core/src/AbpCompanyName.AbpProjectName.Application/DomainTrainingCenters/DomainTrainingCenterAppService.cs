using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainTrainingCenters.Dto;

namespace AbpCompanyName.AbpProjectName.DomainTrainingCenters
{
	public class DomainTrainingCenterAppService : AsyncFilteredAppService<DomainTrainingCenter, DomainTrainingCenterDto, Guid, FilteredResultRequestDto>, IDomainTrainingCenterAppService
	{
		public DomainTrainingCenterAppService(IRepository<DomainTrainingCenter, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainId ASC";
		}

		protected override IQueryable<DomainTrainingCenter> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingCenter, 
				e => e.Domain
			);
        }
	}
}