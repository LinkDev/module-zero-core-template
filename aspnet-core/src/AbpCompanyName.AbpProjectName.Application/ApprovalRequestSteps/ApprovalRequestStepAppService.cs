using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApprovalRequestSteps.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalRequestSteps
{
	public class ApprovalRequestStepAppService : AsyncFilteredAppService<ApprovalRequestStep, ApprovalRequestStepDto, Guid, FilteredResultRequestDto>, IApprovalRequestStepAppService
	{
		public ApprovalRequestStepAppService(IRepository<ApprovalRequestStep, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "ApprovedBy ASC";
		}

		protected override IQueryable<ApprovalRequestStep> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.ApprovalRequest, 
				e => e.ApprovalStep
			);
        }
	}
}