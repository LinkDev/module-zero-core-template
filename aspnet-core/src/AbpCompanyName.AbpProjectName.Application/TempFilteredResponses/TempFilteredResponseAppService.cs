using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TempFilteredResponses.Dto;

namespace AbpCompanyName.AbpProjectName.TempFilteredResponses
{
	public class TempFilteredResponseAppService : AsyncFilteredAppService<TempFilteredResponse, TempFilteredResponseDto, Guid, FilteredResultRequestDto>, ITempFilteredResponseAppService
	{
		public TempFilteredResponseAppService(IRepository<TempFilteredResponse, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Code ASC";
		}

	}
}