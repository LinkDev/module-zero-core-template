using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ResponseSubStatuses.Dto;

namespace AbpCompanyName.AbpProjectName.ResponseSubStatuses
{
	public interface IResponseSubStatusAppService : IFilteredAppService<ResponseSubStatusDto, Guid, FilteredResultRequestDto>
	{
		
	}
}