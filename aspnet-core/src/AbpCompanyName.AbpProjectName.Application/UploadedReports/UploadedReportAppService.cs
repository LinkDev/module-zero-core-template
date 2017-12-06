using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UploadedReports.Dto;

namespace AbpCompanyName.AbpProjectName.UploadedReports
{
	public class UploadedReportAppService : AsyncFilteredAppService<UploadedReport, UploadedReportDto, Guid, FilteredResultRequestDto>, IUploadedReportAppService
	{
		public UploadedReportAppService(IRepository<UploadedReport, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<UploadedReport> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.ReportType, 
				e => e.Domain, 
				e => e.Phase
			);
        }
	}
}