using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainTrainingCenters.Dto;

namespace AbpCompanyName.AbpProjectName.DomainTrainingCenters
{
	public interface IDomainTrainingCenterAppService : IFilteredAppService<DomainTrainingCenterDto, Guid, FilteredResultRequestDto>
	{
		
	}
}