using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingExams.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingExams
{
	public interface ITrainingExamAppService : IFilteredAppService<TrainingExamDto, Guid, FilteredResultRequestDto>
	{
		
	}
}