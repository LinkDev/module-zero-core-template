using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ReportTypes.Dto;

namespace AbpCompanyName.AbpProjectName.ReportTypes
{
	public interface IReportTypeAppService : IFilteredAppService<ReportTypeDto, Guid, FilteredResultRequestDto>
	{
		
	}
}