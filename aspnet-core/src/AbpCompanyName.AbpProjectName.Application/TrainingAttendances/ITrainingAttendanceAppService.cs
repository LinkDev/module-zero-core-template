using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingAttendances.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingAttendances
{
	public interface ITrainingAttendanceAppService : IFilteredAppService<TrainingAttendanceDto, Guid, FilteredResultRequestDto>
	{
		
	}
}