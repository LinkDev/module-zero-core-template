using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingCenterUsers.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingCenterUsers
{
	public interface ITrainingCenterUserAppService : IFilteredAppService<TrainingCenterUserDto, Guid, FilteredResultRequestDto>
	{
		
	}
}