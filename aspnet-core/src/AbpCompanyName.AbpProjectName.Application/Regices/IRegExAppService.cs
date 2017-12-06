using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Regices.Dto;

namespace AbpCompanyName.AbpProjectName.Regices
{
	public interface IRegExAppService : IFilteredAppService<RegExDto, Guid, FilteredResultRequestDto>
	{
		
	}
}