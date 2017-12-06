using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Logs.Dto;

namespace AbpCompanyName.AbpProjectName.Logs
{
	public class LogAppService : AsyncFilteredAppService<Log, LogDto, Guid, FilteredResultRequestDto>, ILogAppService
	{
		public LogAppService(IRepository<Log, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "CreatedById ASC";
		}

	}
}