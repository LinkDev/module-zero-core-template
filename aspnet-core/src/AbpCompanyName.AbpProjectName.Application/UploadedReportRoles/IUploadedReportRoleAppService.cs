using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UploadedReportRoles.Dto;

namespace AbpCompanyName.AbpProjectName.UploadedReportRoles
{
	public interface IUploadedReportRoleAppService : IFilteredAppService<UploadedReportRoleDto, string, FilteredResultRequestDto>
	{
		
	}
}