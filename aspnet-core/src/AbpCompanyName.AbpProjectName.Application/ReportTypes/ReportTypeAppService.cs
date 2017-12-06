using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ReportTypes.Dto;

namespace AbpCompanyName.AbpProjectName.ReportTypes
{
	public class ReportTypeAppService : AsyncFilteredAppService<ReportType, ReportTypeDto, Guid, FilteredResultRequestDto>, IReportTypeAppService
	{
		public ReportTypeAppService(IRepository<ReportType, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}