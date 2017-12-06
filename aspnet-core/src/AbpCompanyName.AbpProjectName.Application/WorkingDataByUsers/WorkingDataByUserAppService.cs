using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.WorkingDataByUsers.Dto;

namespace AbpCompanyName.AbpProjectName.WorkingDataByUsers
{
	public class WorkingDataByUserAppService : AsyncFilteredAppService<WorkingDataByUser, WorkingDataByUserDto, Guid, FilteredResultRequestDto>, IWorkingDataByUserAppService
	{
		public WorkingDataByUserAppService(IRepository<WorkingDataByUser, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

	}
}