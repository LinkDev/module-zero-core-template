using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Responses.Dto;

namespace AbpCompanyName.AbpProjectName.Responses
{
	public class ResponseAppService : AsyncFilteredAppService<Response, ResponseDto, Guid, FilteredResultRequestDto>, IResponseAppService
	{
		public ResponseAppService(IRepository<Response, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

	}
}