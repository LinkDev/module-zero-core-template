using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.LocationTrackings.Dto;

namespace AbpCompanyName.AbpProjectName.LocationTrackings
{
	public interface ILocationTrackingAppService : IFilteredAppService<LocationTrackingDto, Guid, FilteredResultRequestDto>
	{
		
	}
}