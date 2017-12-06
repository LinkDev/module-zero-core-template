using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApprovalRequests.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalRequests
{
	public interface IApprovalRequestAppService : IFilteredAppService<ApprovalRequestDto, Guid, FilteredResultRequestDto>
	{
		
	}
}