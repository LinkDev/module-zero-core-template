using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ViolatedValidationRules.Dto;

namespace AbpCompanyName.AbpProjectName.ViolatedValidationRules
{
	public interface IViolatedValidationRuleAppService : IFilteredAppService<ViolatedValidationRuleDto, Guid, FilteredResultRequestDto>
	{
		
	}
}