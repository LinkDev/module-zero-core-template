using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ResponseSubStatuses.Dto;

namespace AbpCompanyName.AbpProjectName.ResponseSubStatuses
{
	public class ResponseSubStatusAppService : AsyncFilteredAppService<ResponseSubStatus, ResponseSubStatusDto, Guid, FilteredResultRequestDto>, IResponseSubStatusAppService
	{
		public ResponseSubStatusAppService(IRepository<ResponseSubStatus, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}