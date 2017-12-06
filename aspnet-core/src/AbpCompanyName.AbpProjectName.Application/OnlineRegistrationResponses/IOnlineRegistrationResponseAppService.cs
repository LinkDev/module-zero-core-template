using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.OnlineRegistrationResponses.Dto;

namespace AbpCompanyName.AbpProjectName.OnlineRegistrationResponses
{
	public interface IOnlineRegistrationResponseAppService : IFilteredAppService<OnlineRegistrationResponseDto, Guid, FilteredResultRequestDto>
	{
		
	}
}