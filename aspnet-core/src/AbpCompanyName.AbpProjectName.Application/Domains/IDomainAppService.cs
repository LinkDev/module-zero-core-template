using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Domains.Dto;

namespace AbpCompanyName.AbpProjectName.Domains
{
	public interface IDomainAppService : IFilteredAppService<DomainDto, Guid, FilteredResultRequestDto>
	{
		
	}
}