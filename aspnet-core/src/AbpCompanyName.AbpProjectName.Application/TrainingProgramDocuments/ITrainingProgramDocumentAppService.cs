using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingProgramDocuments.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingProgramDocuments
{
	public interface ITrainingProgramDocumentAppService : IFilteredAppService<TrainingProgramDocumentDto, Guid, FilteredResultRequestDto>
	{
		
	}
}