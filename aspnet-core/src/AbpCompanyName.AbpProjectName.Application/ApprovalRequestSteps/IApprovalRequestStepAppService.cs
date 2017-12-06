using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApprovalRequestSteps.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalRequestSteps
{
	public interface IApprovalRequestStepAppService : IFilteredAppService<ApprovalRequestStepDto, Guid, FilteredResultRequestDto>
	{
		
	}
}