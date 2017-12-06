using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ViolatedValidationRules.Dto;

namespace AbpCompanyName.AbpProjectName.ViolatedValidationRules
{
	public class ViolatedValidationRuleAppService : AsyncFilteredAppService<ViolatedValidationRule, ViolatedValidationRuleDto, Guid, FilteredResultRequestDto>, IViolatedValidationRuleAppService
	{
		public ViolatedValidationRuleAppService(IRepository<ViolatedValidationRule, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "ValidationRuleId ASC";
		}

	}
}