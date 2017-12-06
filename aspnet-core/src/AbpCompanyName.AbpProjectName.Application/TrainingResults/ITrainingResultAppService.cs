using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingResults.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingResults
{
	public interface ITrainingResultAppService : IFilteredAppService<TrainingResultDto, Guid, FilteredResultRequestDto>
	{
		
	}
}