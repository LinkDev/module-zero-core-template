using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingPrograms.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingPrograms
{
	public interface ITrainingProgramAppService : IFilteredAppService<TrainingProgramDto, Guid, FilteredResultRequestDto>
	{
		
	}
}