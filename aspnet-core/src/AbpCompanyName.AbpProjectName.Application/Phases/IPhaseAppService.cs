using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Phases.Dto;

namespace AbpCompanyName.AbpProjectName.Phases
{
	public interface IPhaseAppService : IFilteredAppService<PhaseDto, Guid, FilteredResultRequestDto>
	{
		
	}
}