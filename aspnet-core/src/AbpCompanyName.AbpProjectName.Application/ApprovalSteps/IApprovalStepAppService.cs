using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ApprovalSteps.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalSteps
{
	public interface IApprovalStepAppService : IFilteredAppService<ApprovalStepDto, Guid, FilteredResultRequestDto>
	{
		
	}
}