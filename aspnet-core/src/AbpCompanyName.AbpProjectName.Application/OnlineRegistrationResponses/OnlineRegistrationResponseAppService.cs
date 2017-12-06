using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.OnlineRegistrationResponses.Dto;

namespace AbpCompanyName.AbpProjectName.OnlineRegistrationResponses
{
	public class OnlineRegistrationResponseAppService : AsyncFilteredAppService<OnlineRegistrationResponse, OnlineRegistrationResponseDto, Guid, FilteredResultRequestDto>, IOnlineRegistrationResponseAppService
	{
		public OnlineRegistrationResponseAppService(IRepository<OnlineRegistrationResponse, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "NationalId ASC";
		}

	}
}