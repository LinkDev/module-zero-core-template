using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.LocationTrackings.Dto;

namespace AbpCompanyName.AbpProjectName.LocationTrackings
{
	public class LocationTrackingAppService : AsyncFilteredAppService<LocationTracking, LocationTrackingDto, Guid, FilteredResultRequestDto>, ILocationTrackingAppService
	{
		public LocationTrackingAppService(IRepository<LocationTracking, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "ObjectId ASC";
		}

	}
}