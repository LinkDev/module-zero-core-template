using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TempFilteredResponses.Dto;

namespace AbpCompanyName.AbpProjectName.TempFilteredResponses
{
	public interface ITempFilteredResponseAppService : IFilteredAppService<TempFilteredResponseDto, Guid, FilteredResultRequestDto>
	{
		
	}
}