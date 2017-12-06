using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingMembers.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingMembers
{
	public interface ITrainingMemberAppService : IFilteredAppService<TrainingMemberDto, Guid, FilteredResultRequestDto>
	{
		
	}
}