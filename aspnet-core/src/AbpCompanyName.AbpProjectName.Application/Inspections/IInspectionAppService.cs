using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Inspections.Dto;

namespace AbpCompanyName.AbpProjectName.Inspections
{
	public interface IInspectionAppService : IFilteredAppService<InspectionDto, Guid, FilteredResultRequestDto>
	{
		
	}
}