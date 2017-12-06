using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.CallBackResponses.Dto;

namespace AbpCompanyName.AbpProjectName.CallBackResponses
{
	public interface ICallBackResponseAppService : IFilteredAppService<CallBackResponseDto, Guid, FilteredResultRequestDto>
	{
		
	}
}