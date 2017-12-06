using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingCenters.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingCenters
{
	public class TrainingCenterAppService : AsyncFilteredAppService<TrainingCenter, TrainingCenterDto, Guid, FilteredResultRequestDto>, ITrainingCenterAppService
	{
		public TrainingCenterAppService(IRepository<TrainingCenter, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}