using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingCenters.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingCenters
{
	public interface ITrainingCenterAppService : IFilteredAppService<TrainingCenterDto, Guid, FilteredResultRequestDto>
	{
		
	}
}