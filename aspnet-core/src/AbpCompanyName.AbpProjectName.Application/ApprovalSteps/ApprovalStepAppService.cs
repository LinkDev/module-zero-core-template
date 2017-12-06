using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApprovalSteps.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalSteps
{
	public class ApprovalStepAppService : AsyncFilteredAppService<ApprovalStep, ApprovalStepDto, Guid, FilteredResultRequestDto>, IApprovalStepAppService
	{
		public ApprovalStepAppService(IRepository<ApprovalStep, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "RoleId ASC";
		}

	}
}