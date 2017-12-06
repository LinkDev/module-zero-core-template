using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.LogActionTypes.Dto;

namespace AbpCompanyName.AbpProjectName.LogActionTypes
{
	public class LogActionTypeAppService : AsyncFilteredAppService<LogActionType, LogActionTypeDto, int, FilteredResultRequestDto>, ILogActionTypeAppService
	{
		public LogActionTypeAppService(IRepository<LogActionType, int> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}