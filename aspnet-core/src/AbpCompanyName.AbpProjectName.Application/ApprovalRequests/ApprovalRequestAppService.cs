using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApprovalRequests.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalRequests
{
	public class ApprovalRequestAppService : AsyncFilteredAppService<ApprovalRequest, ApprovalRequestDto, Guid, FilteredResultRequestDto>, IApprovalRequestAppService
	{
		public ApprovalRequestAppService(IRepository<ApprovalRequest, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Type ASC";
		}

		protected override IQueryable<ApprovalRequest> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.ApprovalStep
			);
        }
	}
}