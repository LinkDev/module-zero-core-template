using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UploadedReports.Dto;

namespace AbpCompanyName.AbpProjectName.UploadedReports
{
	public interface IUploadedReportAppService : IFilteredAppService<UploadedReportDto, Guid, FilteredResultRequestDto>
	{
		
	}
}