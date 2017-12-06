using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Applications.Dto;

namespace AbpCompanyName.AbpProjectName.Applications
{
	public interface IApplicationAppService : IFilteredAppService<ApplicationDto, Guid, FilteredResultRequestDto>
	{
		
	}
}