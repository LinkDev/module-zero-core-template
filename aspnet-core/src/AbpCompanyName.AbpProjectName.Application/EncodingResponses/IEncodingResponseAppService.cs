using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.EncodingResponses.Dto;

namespace AbpCompanyName.AbpProjectName.EncodingResponses
{
	public interface IEncodingResponseAppService : IFilteredAppService<EncodingResponseDto, Guid, FilteredResultRequestDto>
	{
		
	}
}