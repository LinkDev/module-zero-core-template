using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UploadedReportRoles.Dto;

namespace AbpCompanyName.AbpProjectName.UploadedReportRoles
{
	public class UploadedReportRoleAppService : AsyncFilteredAppService<UploadedReportRole, UploadedReportRoleDto, string, FilteredResultRequestDto>, IUploadedReportRoleAppService
	{
		public UploadedReportRoleAppService(IRepository<UploadedReportRole, string> repository)
            : base(repository)
        {
			this.DefaultSort = "RoleId ASC";
		}

		protected override IQueryable<UploadedReportRole> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.UploadedReport
			);
        }
	}
}