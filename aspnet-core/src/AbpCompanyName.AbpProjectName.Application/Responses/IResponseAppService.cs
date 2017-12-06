using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Responses.Dto;

namespace AbpCompanyName.AbpProjectName.Responses
{
	public interface IResponseAppService : IFilteredAppService<ResponseDto, Guid, FilteredResultRequestDto>
	{
		
	}
}